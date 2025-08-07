import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react'
import {
  SoftcropArea,
  SoftcropPoint,
  ImageDimensions,
  Position,
  calculateMinScale,
  constrainPosition,
  calculateCropArea,
  calculateStateForCropArea,
  calculateCenteredState,
  applyZoom,
  clickToFocusPoint,
  calculateFocusPointScreenPosition,
  constrainFocusPointToVisibleArea,
  updateConstrainedFocusPoint,
  wheelEventToZoomFactor
} from './softcrop-lib'
import { FocusIcon } from 'lucide-react'

export interface SoftcropRef {
  getCropArea: () => SoftcropArea | null
  getFocusPoint: () => SoftcropPoint | null
  setCropArea: (x: number, y: number, w: number, h: number) => void
  setFocusPoint: (x: number, y: number) => void
  zoomIn: () => void
  zoomOut: () => void
  reset: () => void
}

interface SoftcropProps {
  src: string
  children?: React.ReactNode
  maxZoom?: number
  zoomSensitivity?: number
  onChange?: (cropArea: SoftcropArea | null, focusPoint: SoftcropPoint | null) => void
}

export const Softcrop = forwardRef<SoftcropRef, SoftcropProps>(({
  src,
  children,
  maxZoom = 5,
  zoomSensitivity = 0.02,
  onChange
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const focusPointRef = useRef<HTMLDivElement>(null)

  // Basic state
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({ width: 0, height: 0 })
  const [containerSize, setContainerSize] = useState<ImageDimensions>({ width: 0, height: 0 })

  // Transform state
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [focusPoint, setFocusPoint] = useState<SoftcropPoint | null>(null)

  // Interaction state
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 })

  // Calculate constraints - use container width for image display width
  const imageDisplayWidth = containerSize.width
  const imageDisplayHeight = imageDimensions.width > 0
    ? containerSize.width * (imageDimensions.height / imageDimensions.width)
    : 0

  const displayDimensions = {
    width: imageDisplayWidth,
    height: imageDisplayHeight
  }

  const constraints = {
    minScale: calculateMinScale(containerSize, displayDimensions),
    maxScale: maxZoom,
    containerSize,
    imageDimensions: displayDimensions
  }

  // Handle image load
  const handleImageLoad = useCallback(() => {
    if (!imageRef.current) return

    const dimensions = {
      width: imageRef.current.naturalWidth,
      height: imageRef.current.naturalHeight
    }

    setImageDimensions(dimensions)
    setImageLoaded(true)
  }, [])

  // When relevant data for crop area or focus point changes we callback onChange() if exists
  useEffect(() => {
    if (!onChange) return

    onChange(
      calculateCropArea(scale, position, constraints),
      focusPoint
    )
  }, [scale, position, focusPoint, onChange, constraints])

  // Handle container resize and set wrapper height
  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return

    const updateSize = () => {
      if (!containerRef.current || !wrapperRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight

      setContainerSize({
        width: containerWidth,
        height: containerHeight
      })

      // Set wrapper height to match container
      wrapperRef.current.style.height = containerHeight + 'px'
    }

    updateSize()
    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(containerRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  // Center image when dimensions change
  useEffect(() => {
    if (!imageLoaded || containerSize.width === 0 || !wrapperRef.current) return

    // Set wrapper height based on image aspect ratio if container height is 0
    if (containerSize.height === 0 && imageDimensions.width > 0) {
      const aspectRatio = imageDimensions.height / imageDimensions.width
      const calculatedHeight = containerSize.width * aspectRatio
      wrapperRef.current.style.height = calculatedHeight + 'px'

      // Update container size state
      setContainerSize(prev => ({
        ...prev,
        height: calculatedHeight
      }))
      return
    }

    const centeredState = calculateCenteredState(constraints)
    setScale(centeredState.scale)
    setPosition(centeredState.position)
  }, [imageLoaded, containerSize.width, containerSize.height, imageDimensions])

  // Wheel event listener must have passive: false to prevent scrolling page or editor
  useEffect(() => {
    if (!wrapperRef.current) return

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const factor = wheelEventToZoomFactor(e.deltaY, zoomSensitivity)
      const newState = applyZoom(scale, position, factor, constraints)

      setScale(newState.scale)
      setPosition(newState.position)
    }

    const wrapper = wrapperRef.current
    wrapper.addEventListener('wheel', handleWheelEvent, { passive: false })

    return () => {
      wrapper.removeEventListener('wheel', handleWheelEvent)
    }
  }, [scale, position, constraints, zoomSensitivity])


  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setDragOffset(position)
  }, [position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return

    e.preventDefault()

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    const newPosition = {
      x: dragOffset.x + deltaX,
      y: dragOffset.y + deltaY
    }

    const constrainedPosition = constrainPosition(newPosition, scale, constraints)
    setPosition(constrainedPosition)
  }, [isDragging, dragStart, dragOffset, scale, constraints])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    setIsDragging(false)

    // Handle focus point click
    if (!containerRef.current) return

    if (!deltaX && !deltaY) {
      const rect = containerRef.current.getBoundingClientRect()
      const newFocusPoint = clickToFocusPoint(
        { x: e.clientX, y: e.clientY },
        rect,
        scale,
        position,
        displayDimensions
      )

      if (newFocusPoint) {
        setFocusPoint(newFocusPoint)
      }
    }
  }, [isDragging, scale, position, imageDimensions])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) return

    const touches = e.touches
    // FIXME: This might be necessary...
    // if (touches.length === 2) {
    //   const dx = touches[0].clientX - touches[1].clientX
    //   const dy = touches[0].clientY - touches[1].clientY
    //   const start = Math.sqrt(dx * dx + dy * dy)
    //   console.log('Pinch start:', start)
    // } else if (e.touches.length === 1) {
      e.preventDefault()
      setIsDragging(true)
      setDragStart({ x: touches[0].clientX, y: touches[0].clientY })
      setDragOffset(position)
    // }
  }, [position])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return

    e.preventDefault()

    const deltaX = dragStart.x - e.touches[0].clientX
    const deltaY = dragStart.y - e.touches[0].clientY
    const constrainedPosition = constrainPosition(
      {
        x: dragOffset.x - deltaX,
        y: dragOffset.y - deltaY
      },
      scale,
      constraints
    )

    setPosition(constrainedPosition)
  }, [isDragging, dragStart, dragOffset, scale, constraints])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (isDragging) {
      setIsDragging(false)
      return
    }

    if (e.touches.length === 0) {

    }
  }, [])

  // Calculate focus point display position
  const focusPointDisplay = focusPoint ? (() => {
    const screenPos = calculateFocusPointScreenPosition(focusPoint, scale, position, displayDimensions)
    const constrainedPos = constrainFocusPointToVisibleArea(screenPos, containerSize, 40)

    // Update focus point if it was constrained
    if (screenPos.x !== constrainedPos.x || screenPos.y !== constrainedPos.y) {
      const updatedPoint = updateConstrainedFocusPoint(constrainedPos, scale, position, displayDimensions)
      setTimeout(() => setFocusPoint(updatedPoint), 0)
    }

    return constrainedPos
  })() : null

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    getCropArea: () => calculateCropArea(scale, position, constraints),

    getFocusPoint: () => focusPoint,

    setCropArea: (x: number, y: number, w: number, h: number) => {
      try {
        const area = { x, y, w, h }
        const newState = calculateStateForCropArea(area, constraints)
        setScale(newState.scale)
        setPosition(newState.position)
      } catch (error) {
        console.warn('Failed to set crop area:', error)
      }
    },

    setFocusPoint: (x: number, y: number) => {
      setFocusPoint({ x, y })
      if (focusPointRef.current) {
        focusPointRef.current.style.display = 'flex'
      }
    },

    zoomIn: () => {
      const factor = Math.pow(1 + zoomSensitivity, 3)
      const newState = applyZoom(scale, position, factor, constraints)
      setScale(newState.scale)
      setPosition(newState.position)
    },

    zoomOut: () => {
      const factor = Math.pow(1 + zoomSensitivity, -3)
      const newState = applyZoom(scale, position, factor, constraints)
      setScale(newState.scale)
      setPosition(newState.position)
    },

    reset: () => {
      const centeredState = calculateCenteredState(constraints)
      setScale(centeredState.scale)
      setPosition(centeredState.position)
      setFocusPoint(null)
      if (focusPointRef.current) {
        focusPointRef.current.style.display = 'none'
      }
    }
  }), [scale, position, constraints, focusPoint, zoomSensitivity])

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden"
    >
      <div
        ref={wrapperRef}
        className="relative overflow-hidden w-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        <img
          ref={imageRef}
          src={src}
          onLoad={handleImageLoad}
          className="block absolute select-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            width: displayDimensions.width || 'auto',
            height: displayDimensions.height || 'auto'
          }}
          draggable={false}
        />

        {/* Focus Point */}
        {focusPointDisplay && (
          <div
            ref={focusPointRef}
            className="absolute top-0 left-0 w-[40px] h-[40px] rounded-[12px] pointer-events-none"
            style={{
              transform: `translate(${focusPointDisplay.x - 20}px, ${focusPointDisplay.y - 20}px)`,
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0px 20px 0px',
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              display: 'flex'
            }}
          >
            <FocusIcon
              color='rgba(255, 255, 255, 0.9)'
              className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center"
            ></FocusIcon>
          </div>
        )}
      </div>

      {/* Render children (Grid, etc.) */}
      {children}
    </div>
  )
})
