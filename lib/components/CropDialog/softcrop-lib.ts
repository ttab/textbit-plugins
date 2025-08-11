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

// Calculate minimum scale to fill container
export const calculateMinScale = (
  containerSize: ImageDimensions,
  imageDimensions: ImageDimensions
): number => {
  return Math.max(
    containerSize.width / imageDimensions.width,
    containerSize.height / imageDimensions.height
  )
}

// Constrain position to keep image covering container
export const constrainPosition = (
  position: Position,
  scale: number,
  constraints: SoftcropConstraints
): Position => {
  const { containerSize, imageDimensions } = constraints

  const scaledWidth = imageDimensions.width * scale
  const scaledHeight = imageDimensions.height * scale

  const minX = containerSize.width - scaledWidth
  const maxX = 0
  const minY = containerSize.height - scaledHeight
  const maxY = 0

  return {
    x: Math.max(minX, Math.min(maxX, position.x)),
    y: Math.max(minY, Math.min(maxY, position.y))
  }
}

// Calculate current crop area from transform state
export const calculateCropArea = (
  scale: number,
  position: Position,
  constraints: SoftcropConstraints
): SoftcropArea | null => {
  const { containerSize, imageDimensions } = constraints

  // Check for invalid input data
  if (
    !imageDimensions ||
    !containerSize ||
    imageDimensions.width <= 0 ||
    imageDimensions.height <= 0 ||
    containerSize.width <= 0 ||
    containerSize.height <= 0 ||
    scale <= 0 ||
    !isFinite(scale) ||
    !isFinite(position.x) ||
    !isFinite(position.y)
  ) {
    return null
  }

  const scaledWidth = imageDimensions.width * scale
  const scaledHeight = imageDimensions.height * scale

  // Check if scaled dimensions are valid
  if (scaledWidth <= 0 || scaledHeight <= 0 || !isFinite(scaledWidth) || !isFinite(scaledHeight)) {
    return null
  }

  const visibleLeft = Math.max(0, -position.x)
  const visibleTop = Math.max(0, -position.y)
  const visibleRight = Math.min(scaledWidth, containerSize.width - position.x)
  const visibleBottom = Math.min(scaledHeight, containerSize.height - position.y)

  // Check if we have valid visible area
  if (visibleRight <= visibleLeft || visibleBottom <= visibleTop) {
    return null
  }

  // Use decimals instead of percentages
  const cropX = visibleLeft / scaledWidth
  const cropY = visibleTop / scaledHeight
  const cropW = (visibleRight - visibleLeft) / scaledWidth
  const cropH = (visibleBottom - visibleTop) / scaledHeight

  // Check if calculated values are valid
  if (
    !isFinite(cropX) || !isFinite(cropY) || !isFinite(cropW) || !isFinite(cropH) ||
    cropW <= 0 || cropH <= 0 ||
    cropX < 0 || cropY < 0 ||
    cropX + cropW > 1.001 || cropY + cropH > 1.001 // Small tolerance for rounding
  ) {
    return null
  }

  const { x, y, w, h } = {
    x: Math.max(0, Math.round(cropX * 1000) / 1000), // 3 decimal precision
    y: Math.max(0, Math.round(cropY * 1000) / 1000),
    w: Math.max(0, Math.round(cropW * 1000) / 1000),
    h: Math.max(0, Math.round(cropH * 1000) / 1000)
  }

  // Return null if this represents the full image (with tolerance for rounding)
  const tolerance = 0.002 // Allow for small rounding differences
  const isFullImage =
    x <= tolerance &&
    y <= tolerance &&
    w >= (1 - tolerance) &&
    h >= (1 - tolerance)

  return isFullImage ? null : { x, y, w, h }
}

// Calculate transform state to display a specific crop area
export const calculateStateForCropArea = (
  area: SoftcropArea,
  constraints: SoftcropConstraints
): { scale: number; position: Position } => {
  const { containerSize, imageDimensions, minScale, maxScale } = constraints

  const cropWidthInPixels = area.w * imageDimensions.width
  const cropHeightInPixels = area.h * imageDimensions.height

  const scaleX = containerSize.width / cropWidthInPixels
  const scaleY = containerSize.height / cropHeightInPixels
  let targetScale = Math.min(scaleX, scaleY)

  targetScale = Math.max(minScale, Math.min(maxScale, targetScale))

  const cropStartX = area.x * imageDimensions.width
  const cropStartY = area.y * imageDimensions.height

  const scaledCropStartX = cropStartX * targetScale
  const scaledCropStartY = cropStartY * targetScale
  const scaledCropWidth = cropWidthInPixels * targetScale
  const scaledCropHeight = cropHeightInPixels * targetScale

  const targetX = (containerSize.width - scaledCropWidth) / 2 - scaledCropStartX
  const targetY = (containerSize.height - scaledCropHeight) / 2 - scaledCropStartY

  const constrainedPosition = constrainPosition(
    { x: targetX, y: targetY },
    targetScale,
    constraints
  )

  return {
    scale: targetScale,
    position: constrainedPosition
  }
}

// Calculate centered image state
export const calculateCenteredState = (
  constraints: SoftcropConstraints
): { scale: number; position: Position } => {
  const { containerSize, imageDimensions, minScale } = constraints

  const scale = Math.max(minScale, 1)
  const scaledWidth = imageDimensions.width * scale
  const scaledHeight = imageDimensions.height * scale

  const centerX = (containerSize.width - scaledWidth) / 2
  const centerY = (containerSize.height - scaledHeight) / 2

  const constrainedPosition = constrainPosition(
    { x: centerX, y: centerY },
    scale,
    constraints
  )

  return {
    scale,
    position: constrainedPosition
  }
}

// Apply zoom transformation
export const applyZoom = (
  currentScale: number,
  currentPosition: Position,
  zoomFactor: number,
  constraints: SoftcropConstraints
): { scale: number; position: Position } => {
  const { minScale, maxScale, containerSize } = constraints

  const newScale = Math.max(minScale, Math.min(maxScale, currentScale * zoomFactor))

  if (newScale === currentScale) {
    return { scale: currentScale, position: currentPosition }
  }

  const centerX = containerSize.width / 2
  const centerY = containerSize.height / 2

  const scaleDiff = newScale / currentScale
  const newX = centerX - (centerX - currentPosition.x) * scaleDiff
  const newY = centerY - (centerY - currentPosition.y) * scaleDiff

  const constrainedPosition = constrainPosition(
    { x: newX, y: newY },
    newScale,
    constraints
  )

  return {
    scale: newScale,
    position: constrainedPosition
  }
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
