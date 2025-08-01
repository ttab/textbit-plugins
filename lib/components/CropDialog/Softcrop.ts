interface SoftcropData {
  area: {
    x: number
    y: number
    w: number
    h: number
  },
  point: {
    x: number
    y: number
  } | null
}

interface SoftcropOptionsArgs {
  zoomSensitivity?: number
  maxZoom?: number
  onChange?: (data: SoftcropData) => void
}

interface SoftcropOptions {
  zoomSensitivity: number
  maxZoom: number
  onChange?: (data: SoftcropData) => void
}

export class Softcrop {
  #containerEl: HTMLDivElement
  #wrapperEl: HTMLDivElement
  #imageEl: HTMLImageElement
  #focusPointEl: HTMLDivElement

  #containerSize: { width: number, height: number } = { width: 0, height: 0 }
  #imageSize: { width: number, height: number } = { width: 0, height: 0 }
  #imageDisplaySize: { width: number, height: number } = { width: 0, height: 0 }

  #options: SoftcropOptions
  #onChange?: (data: SoftcropData) => void

  #scale: number = 1
  #imageX: number = 0
  #imageY:number = 0

  // Focus point stored as percentage of image dimensions (0-100)
  #focusPoint: { x: number, y: number } | null = null // { x: percentage, y: percentage }
  #focusPointX: number = 0 // Transform X position
  #focusPointY: number = 0 // Transform Y position

  #isPressed: boolean = false
  #isDragging: boolean = false
  #dragStart: { x: number, y: number } = { x: 0, y: 0 }
  #dragOffset: { x: number, y: number } = { x: 0, y: 0 }

  // Debounced grid hding
  #debouncedHideGrid = this.debounce(() => {
      this.toggleGrid(false)
  }, 300)

  constructor(
    containerEl: HTMLDivElement,
    wrapperEl: HTMLDivElement,
    imageEl: HTMLImageElement,
    focusPointEl: HTMLDivElement,
    options: SoftcropOptionsArgs = {}
  ) {
      this.#containerEl = containerEl
      this.#wrapperEl = wrapperEl
      this.#imageEl = imageEl
      this.#focusPointEl = focusPointEl

      // Configuration options
      this.#options = {
          zoomSensitivity: options.zoomSensitivity || 0.015,
          maxZoom: (options.maxZoom && options.maxZoom >= 1 && options.maxZoom <= 10)
            ? options.maxZoom
            : 5
      }
      this.#onChange = options.onChange

      this.#init()
    }

    destroy() {
      this.#detachEventListeners()
    }

    #init() {
      this.#imageEl.onload = () => {
          this.#setupInitialState()
          this.#attachEventListeners()
      }

      if (this.#imageEl.complete) {
          this.#setupInitialState()
          this.#attachEventListeners()
      }

      this.#setupResizeObserver()
    }

    #setupInitialState() {
      this.#imageSize = {
          width: this.#imageEl.naturalWidth,
          height: this.#imageEl.naturalHeight
      }

      this.#updateContainerDimensions()
      this.#setFocusPoint(50, 33)
      this.updateZoomInfo()
    }


    #updateContainerDimensions() {
      this.#containerSize.width = this.#containerEl.offsetWidth

      const aspectRatio = this.#imageSize.height / this.#imageSize.width
      this.#imageDisplaySize.width = this.#containerSize.width
      this.#imageDisplaySize.height = this.#containerSize.width * aspectRatio

      this.#containerSize.height = this.#imageDisplaySize.height
      this.#wrapperEl.style.height = this.#containerSize.height + 'px'

      this.centerImage()
      this.#updateFocusPointTransform()
    }

    #setupResizeObserver() {
      if (window.ResizeObserver) {
          const resizeObserver = new ResizeObserver(() => {
              this.#updateContainerDimensions()
          })
          resizeObserver.observe(this.#containerEl)
      } else {
          window.addEventListener('resize', () => {
              this.#updateContainerDimensions()
          })
      }
    }

    #attachEventListeners() {
      this.#wrapperEl.addEventListener('wheel', (e) => this.#onWheel(e), {capture: true})
      // this.#wrapper.addEventListener('touchstart', (e) => this.handleTouchStart(e))
      this.#wrapperEl.addEventListener('touchmove', (e) => this.#handleTouchMove(e), {capture: true})
      this.#wrapperEl.addEventListener('touchend', (e) => this.#handleTouchEnd(e), {capture: true})

      this.#imageEl.addEventListener('mousedown', (e) => this.#startImageDrag(e), {capture: true})
      this.#imageEl.addEventListener('touchstart', (e) => this.#startImageDrag(e), {capture: true})

      document.addEventListener('mousemove', (e) => this.#handleMove(e), {capture: true})
      document.addEventListener('mouseup', (e) => this.#endDrag(e), {capture: true})
      document.addEventListener('touchmove', (e) => this.#handleMove(e), {capture: true})
    }

    #detachEventListeners() {
      this.#wrapperEl.removeEventListener('wheel', (e) => this.#onWheel(e), {capture: true})
      // this.#wrapper.removeEventListener('touchstart', (e) => this.handleTouchStart(e))
      this.#wrapperEl.removeEventListener('touchmove', (e) => this.#handleTouchMove(e), {capture: true})
      this.#wrapperEl.removeEventListener('touchend', (e) => this.#handleTouchEnd(e), {capture: true})

      this.#imageEl.removeEventListener('mousedown', (e) => this.#startImageDrag(e), {capture: true})
      this.#imageEl.removeEventListener('touchstart', (e) => this.#startImageDrag(e), {capture: true})

      document.removeEventListener('mousemove', (e) => this.#handleMove(e), {capture: true})
      document.removeEventListener('mouseup', (e) => this.#endDrag(e), {capture: true})
      document.removeEventListener('touchmove', (e) => this.#handleMove(e), {capture: true})
    }

    #onWheel(e: WheelEvent) {
      e.preventDefault()

      const normalizedDelta = Math.sign(e.deltaY)
      const zoomDirection = normalizedDelta > 0 ? -1 : 1
      const factor = Math.pow(1 + this.#options.zoomSensitivity, zoomDirection)

      this.#zoom(factor)
    }

    // handleTouchStart(e: TouchEvent) {
    //   if (e.touches.length === 2) {
    //       this.pinchStart = this.getTouchDistance(e.touches)
    //       this.pinchCenter = this.getTouchCenter(e.touches)
    //   } else if (e.touches.length === 1) {
    //       this.startImageDrag(e)
    //   }
    // }

    #handleTouchMove(e: TouchEvent) {
      if (!this.#isPressed) return
      this.#isDragging = true

      this.toggleGrid(true)
      this.#debouncedHideGrid()

      if (e.touches.length === 2) {
          e.preventDefault()
          const currentDistance = this.#getTouchDistance(e.touches)
          const delta = currentDistance / this.pinchStart

          this.#zoom(delta / this.#scale)
          this.pinchStart = currentDistance
      }
    }

    #handleTouchEnd(e: TouchEvent) {
        if (e.touches.length < 2) {
            this.pinchStart = null
            this.pinchCenter = null
        }

        if (!this.#isDragging && e.touches.length === 0 && e.changedTouches.length === 1) {
            this.#handleFocusPointClick(e, e.changedTouches[0].clientX, e.changedTouches[0].clientY)
        }

        this.#isDragging = false
    }

    #getTouchDistance(touches: TouchList) {
        const dx = touches[0].clientX - touches[1].clientX
        const dy = touches[0].clientY - touches[1].clientY
        return Math.sqrt(dx * dx + dy * dy)
    }

    #zoom(factor: number) {
      this.toggleGrid(true)
      this.#debouncedHideGrid()

      const minScaleX = this.#containerSize.width / this.#imageDisplaySize.width
      const minScaleY = this.#containerSize.height / this.#imageDisplaySize.height
      const minScale = Math.max(minScaleX, minScaleY)

      const newScale = Math.max(minScale, Math.min(this.#options.maxZoom, this.#scale * factor))

      if (newScale !== this.#scale) {
          const scaleDiff = newScale / this.#scale

          const centerX = this.#containerSize.width / 2
          const centerY = this.#containerSize.height / 2

          const newX = centerX - (centerX - this.#imageX) * scaleDiff
          const newY = centerY - (centerY - this.#imageY) * scaleDiff

          this.#scale = newScale

          const constrainedPosition = this.constrainImagePosition(newX, newY)
          this.#imageX = constrainedPosition.x
          this.#imageY = constrainedPosition.y

          this.updateImageTransform()
          this.#updateFocusPointTransform()
          this.updateZoomInfo()
      }
    }

    #startImageDrag(e: MouseEvent | TouchEvent) {
      e.preventDefault()
      this.#isPressed = true

      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY

      this.#dragStart = { x: clientX, y: clientY }
      this.#dragOffset = { x: this.#imageX, y: this.#imageY }
    }

    #handleMove(e: MouseEvent | TouchEvent) {
      if (!this.#isPressed) return

      e.preventDefault()
      this.#isDragging = true

      this.toggleGrid(true)
      this.#debouncedHideGrid()

      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY

      const deltaX = clientX - this.#dragStart.x
      const deltaY = clientY - this.#dragStart.y

      const newX = this.#dragOffset.x + deltaX
      const newY = this.#dragOffset.y + deltaY

      const constrainedPosition = this.constrainImagePosition(newX, newY)
      this.#imageX = constrainedPosition.x
      this.#imageY = constrainedPosition.y

      this.updateImageTransform()
      this.#updateFocusPointTransform()
      this.updateZoomInfo()
    }

    #endDrag(e: MouseEvent) {
      if (!this.#isDragging) {
          this.#handleFocusPointClick(e, e.clientX, e.clientY)
      }

      this.#isPressed = false
      this.#isDragging = false
    }

    #handleFocusPointClick(e: MouseEvent, clientX: number, clientY: number) {
        if (this.#isDragging) return

        e.preventDefault()
        e.stopPropagation()

        const rect = this.#wrapperEl.getBoundingClientRect()
        const clickX = clientX - rect.left
        const clickY = clientY - rect.top

        // Convert click position to image coordinates
        const imageClickX = (clickX - this.#imageX) / this.#scale
        const imageClickY = (clickY - this.#imageY) / this.#scale

        // Convert to percentage of image dimensions
        const xPercent = (imageClickX / this.#imageDisplaySize.width) * 100
        const yPercent = (imageClickY / this.#imageDisplaySize.height) * 100

        // Only set focus point if click is within image bounds
        if (xPercent >= 0 && xPercent <= 100 && yPercent >= 0 && yPercent <= 100) {
            this.#setFocusPoint(xPercent, yPercent)
        }
    }

    #setFocusPoint(xPercent: number, yPercent: number) {
      this.#focusPoint = { x: xPercent, y: yPercent }
      this.#focusPointEl.style.display = 'flex'
      this.#updateFocusPointTransform()
      this.updateZoomInfo()
    }

    getFocusPoint() {
        return this.#focusPoint
    }

    #updateFocusPointTransform() {
        if (!this.#focusPoint) return

        // Calculate focus point position in image coordinates
        const imageX = (this.#focusPoint.x / 100) * this.#imageDisplaySize.width
        const imageY = (this.#focusPoint.y / 100) * this.#imageDisplaySize.height

        // Apply the same transform as the image to keep focus point anchored
        this.#focusPointX = this.#imageX + (imageX * this.#scale) - 5 // -5 to center the 10px dot
        this.#focusPointY = this.#imageY + (imageY * this.#scale) - 5 // -5 to center the 10px dot

        // Check if focus point is outside visible area and constrain it
        const constrainedPosition = this.#constrainFocusPointToVisibleArea()
        this.#focusPointX = constrainedPosition.x
        this.#focusPointY = constrainedPosition.y

        // Update the stored focus point percentage based on constrained position
        if (constrainedPosition.updated) {
            const constrainedImageX = (this.#focusPointX + 5 - this.#imageX) / this.#scale
            const constrainedImageY = (this.#focusPointY + 5 - this.#imageY) / this.#scale

            this.#focusPoint.x = (constrainedImageX / this.#imageDisplaySize.width) * 100
            this.#focusPoint.y = (constrainedImageY / this.#imageDisplaySize.height) * 100
        }

        // Apply transform
        this.#focusPointEl.style.transform = `translate(${this.#focusPointX - 20}px, ${this.#focusPointY - 20}px)`

        // Focus point is always visible now since it's constrained to visible area
        this.#focusPointEl.style.opacity = '0.9'
    }

    #constrainFocusPointToVisibleArea() {
        const originalX = this.#focusPointX
        const originalY = this.#focusPointY

        // Define the visible area boundaries (accounting for the 10px focus point size)
        const minX = Math.max(0, -5) // Left edge of container, adjusted for focus point center
        const maxX = Math.min(this.#containerSize.width - 10, this.#containerSize.width - 5) // Right edge
        const minY = Math.max(0, -5) // Top edge
        const maxY = Math.min(this.#containerSize.height - 10, this.#containerSize.height - 5) // Bottom edge

        // Constrain the focus point position
        const constrainedX = Math.max(minX, Math.min(maxX, this.#focusPointX))
        const constrainedY = Math.max(minY, Math.min(maxY, this.#focusPointY))

        // Check if position was actually changed
        const updated = (constrainedX !== originalX || constrainedY !== originalY)

        return {
            x: constrainedX,
            y: constrainedY,
            updated: updated
        }
    }

    updateImageTransform() {
        this.#imageEl.style.transform = `translate(${this.#imageX}px, ${this.#imageY}px) scale(${this.#scale})`
        this.#imageEl.style.transformOrigin = '0 0'
    }

    updateZoomInfo() {
        const zoomPercent = Math.round(this.#scale * 100)
        const x = Math.round(this.#imageX)
        const y = Math.round(this.#imageY)

        const cropData = this.getCropAreaPercent()

        let focusInfo = ''
        if (this.#focusPoint) {
            focusInfo = ` | Focus: ${this.#focusPoint.x.toFixed(1)}%, ${this.#focusPoint.y.toFixed(1)}%`
        }

        // FIXME: Remove when done!
        // console.debug(`Zoom: ${zoomPercent}% | Position: ${x}, ${y} | Crop: x:${cropData.x}% y:${cropData.y}% w:${cropData.w}% h:${cropData.h}%${focusInfo}`)

        if (this.#onChange) {
          this.#onChange({
            area: cropData,
            point: this.#focusPoint
          })
        }
    }

    // Debounce utility function
    debounce(func: (args?: unknown) => void, wait: number) {
        let timeout: NodeJS.Timeout
        return function executedFunction(...args: unknown[]) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    }

    toggleGrid(visible: boolean) {
      if (visible) {
        this.#containerEl.classList.add('grid-visible')
      } else {
        this.#containerEl.classList.remove('grid-visible')
      }
    }

    resetZoom() {
        const minScaleX = this.#containerSize.width / this.#imageDisplaySize.width
        const minScaleY = this.#containerSize.height / this.#imageDisplaySize.height
        this.#scale = Math.max(minScaleX, minScaleY)

        this.centerImage()
    }

    centerImage() {
        const scaledWidth = this.#imageDisplaySize.width * this.#scale
        const scaledHeight = this.#imageDisplaySize.height * this.#scale

        const centerX = (this.#containerSize.width - scaledWidth) / 2
        const centerY = (this.#containerSize.height - scaledHeight) / 2

        const constrainedPosition = this.constrainImagePosition(centerX, centerY)
        this.#imageX = constrainedPosition.x
        this.#imageY = constrainedPosition.y

        this.updateImageTransform()
        this.#updateFocusPointTransform()
        this.updateZoomInfo()
    }

    zoomIn() {
        const factor = Math.pow(1 + this.#options.zoomSensitivity, 3)
        this.#zoom(factor)
    }

    zoomOut() {
        const factor = Math.pow(1 + this.#options.zoomSensitivity, -3)
        this.#zoom(factor)
    }

    setZoomSensitivity(sensitivity: number) {
        this.#options.zoomSensitivity = Math.max(0.01, Math.min(0.5, sensitivity))
        console.log('Updated zoom sensitivity to:', this.#options.zoomSensitivity)
    }

    getZoomSensitivity() {
        return this.#options.zoomSensitivity
    }

    constrainImagePosition(x: number, y: number) {
        const scaledWidth = this.#imageDisplaySize.width * this.#scale
        const scaledHeight = this.#imageDisplaySize.height * this.#scale

        const minX = this.#containerSize.width - scaledWidth
        const maxX = 0
        const minY = this.#containerSize.height - scaledHeight
        const maxY = 0

        const constrainedX = Math.max(minX, Math.min(maxX, x))
        const constrainedY = Math.max(minY, Math.min(maxY, y))

        return { x: constrainedX, y: constrainedY }
    }

    getCropAreaPercent() {
        const scaledWidth = this.#imageDisplaySize.width * this.#scale
        const scaledHeight = this.#imageDisplaySize.height * this.#scale

        const visibleLeft = Math.max(0, -this.#imageX)
        const visibleTop = Math.max(0, -this.#imageY)
        const visibleRight = Math.min(scaledWidth, this.#containerSize.width - this.#imageX)
        const visibleBottom = Math.min(scaledHeight, this.#containerSize.height - this.#imageY)

        const cropX = (visibleLeft / scaledWidth) * 100
        const cropY = (visibleTop / scaledHeight) * 100
        const cropW = ((visibleRight - visibleLeft) / scaledWidth) * 100
        const cropH = ((visibleBottom - visibleTop) / scaledHeight) * 100

        return {
            x: Math.max(0, Math.round(cropX * 10) / 10),
            y: Math.max(0, Math.round(cropY * 10) / 10),
            w: Math.max(0, Math.round(cropW * 10) / 10),
            h: Math.max(0, Math.round(cropH * 10) / 10)
        }
    }

    getCropData() {
        return this.getCropAreaPercent()
    }

    getZoomLevel() {
        return this.#scale
    }

    getPosition() {
        return { x: this.#imageX, y: this.#imageY }
    }

    setContainerWidth(width: number) {
        this.#containerEl.style.width = width + 'px'
    }
}
