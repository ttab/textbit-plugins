export interface SoftcropArea {
  x: number // 0.0 - 1.0
  y: number // 0.0 - 1.0
  w: number // 0.0 - 1.0
  h: number // 0.0 - 1.0
}

export interface SoftcropPoint {
  x: number // 0.0 - 1.0
  y: number // 0.0 - 1.0
}

export interface ImageDimensions {
  width: number
  height: number
}

export interface Position {
  x: number
  y: number
}

export interface SoftcropConstraints {
  minScale: number
  maxScale: number
  containerSize: ImageDimensions
  imageDimensions: ImageDimensions
}

// Convert click position to focus point
export const clickToFocusPoint = (
  clickPosition: Position,
  containerRect: DOMRect,
  scale: number,
  imagePosition: Position,
  imageDimensions: ImageDimensions
): SoftcropPoint | null => {
  const clickX = clickPosition.x - containerRect.left
  const clickY = clickPosition.y - containerRect.top

  const imageClickX = (clickX - imagePosition.x) / scale
  const imageClickY = (clickY - imagePosition.y) / scale

  const xDecimal = imageClickX / imageDimensions.width
  const yDecimal = imageClickY / imageDimensions.height

  if (xDecimal >= 0 && xDecimal <= 1 && yDecimal >= 0 && yDecimal <= 1) {
    return { x: xDecimal, y: yDecimal }
  }

  return null
}

// Calculate focus point screen position
export const calculateFocusPointScreenPosition = (
  focusPoint: SoftcropPoint,
  scale: number,
  imagePosition: Position,
  imageDimensions: ImageDimensions
): Position => {
  return {
    x: imagePosition.x + focusPoint.x * imageDimensions.width * scale,
    y: imagePosition.y + focusPoint.y * imageDimensions.height * scale
  }
}

// Constrain focus point to visible area
export const constrainFocusPointToVisibleArea = (
  screenPosition: Position,
  containerSize: ImageDimensions,
  focusPointSize: number = 40
): Position => {
  const halfSize = focusPointSize / 2

  return {
    x: Math.max(halfSize, Math.min(containerSize.width - halfSize, screenPosition.x)),
    y: Math.max(halfSize, Math.min(containerSize.height - halfSize, screenPosition.y))
  }
}

// Update focus point when constrained to stay within visible area
export const updateConstrainedFocusPoint = (
  constrainedScreenPosition: Position,
  scale: number,
  imagePosition: Position,
  imageDimensions: ImageDimensions
): SoftcropPoint => {
  const constrainedImageX = (constrainedScreenPosition.x - imagePosition.x) / scale
  const constrainedImageY = (constrainedScreenPosition.y - imagePosition.y) / scale

  return {
    x: constrainedImageX / imageDimensions.width,
    y: constrainedImageY / imageDimensions.height
  }
}

// Utility function to create zoom factor from wheel event
export const wheelEventToZoomFactor = (
  deltaY: number,
  zoomSensitivity: number = 0.02
): number => {
  const zoomDirection = deltaY > 0 ? -1 : 1
  return Math.pow(1 + zoomSensitivity, zoomDirection)
}

// Parse crop string to {x, y, w, h} object (or null)
export const parseCropString = (crop: string | undefined): { x: number, y: number, w: number, h: number } | null => {
  return crop
    ? (() => {
        const parts = crop.split(' ').map(parseFloat)
        return parts.length === 4 ? { x: parts[0], y: parts[1], w: parts[2], h: parts[3] } : null
      })()
    : null
}

// Parse focus string to {x, y} object (or null)
export const parseFocusString = (focus: string | undefined): { x: number, y: number } | null => {
  return focus
    ? (() => {
        const parts = focus.split(' ').map(parseFloat)
        return parts.length === 2 ? { x: parts[0], y: parts[1] } : null
      })()
    : null
}

export const decomposeCropArea = (
  containerSize: { width: number, height: number },
  targetCrop: SoftcropArea,
) => {
  const containerAspectRatio = containerSize.width / containerSize.height
  // Convert target crop ratios to actual aspect ratio by multiplying by container dimensions
  const targetAspectRatio = (containerSize.width * targetCrop.w) / (containerSize.height * targetCrop.h)

  const baseCrop = {...targetCrop}
  const dragOffsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  if (Math.abs(targetAspectRatio - containerAspectRatio) < 0.001) {
    // Aspect ratio already the same which means we can just use
    // the targetCrop as is with zero drag offsets.
    return {
      baseCrop: targetCrop,
      dragOffsets
    }
  }

  if (targetAspectRatio > containerAspectRatio) {
    // Target proportionally wider than container
    const newHeightInPx = (targetCrop.w * containerSize.width) / containerAspectRatio
    const newHeight = newHeightInPx / containerSize.height

    // Get the difference from the target crop height taking scale into account
    const factor = containerSize.height / newHeightInPx
    const diff = (newHeight - baseCrop.h) * factor

    // Expaned base crop height to get correct proportions
    baseCrop.h = newHeight

    const overflow = baseCrop.y + baseCrop.h - 1
    if (overflow > 0) {
      dragOffsets.top = overflow * factor
      dragOffsets.bottom = diff - (overflow * factor)
      baseCrop.y -= overflow
    } else {
      dragOffsets.bottom = diff
    }
  } else {
    // Target is proportionally taller
    const newWidthInPx = (targetCrop.h * containerSize.height) * containerAspectRatio
    const newWidth = newWidthInPx / containerSize.width

    // Get the difference from the target crop width taking scale into account
    const factor = containerSize.width / newWidthInPx
    const diff = (newWidth - baseCrop.w) * factor

    // Expand base crop width to get correct proportions
    baseCrop.w = newWidth

    // Now add dragged dimmers offsets
    // Check wheter it overflows the right edge
    const overflow = baseCrop.x + baseCrop.w - 1
    if (overflow > 0) {
      // Overflows on the right
      dragOffsets.left = overflow * factor
      dragOffsets.right = diff - (overflow * factor)
      baseCrop.x -= overflow
    } else {
      dragOffsets.right = diff
    }
  }

  return { baseCrop, dragOffsets }
}
