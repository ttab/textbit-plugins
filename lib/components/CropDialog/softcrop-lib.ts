export interface SoftcropArea {
  x: number
  y: number
  w: number
  h: number
}

export interface SoftcropPoint {
  x: number
  y: number
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

  const cropX = (visibleLeft / scaledWidth) * 100
  const cropY = (visibleTop / scaledHeight) * 100
  const cropW = ((visibleRight - visibleLeft) / scaledWidth) * 100
  const cropH = ((visibleBottom - visibleTop) / scaledHeight) * 100

  // Check if calculated percentages are valid
  if (
    !isFinite(cropX) || !isFinite(cropY) || !isFinite(cropW) || !isFinite(cropH) ||
    cropW <= 0 || cropH <= 0 ||
    cropX < 0 || cropY < 0 ||
    cropX + cropW > 100.1 || cropY + cropH > 100.1 // Small tolerance for rounding
  ) {
    return null
  }

  const { x, y, w, h } = {
    x: Math.max(0, Math.round(cropX * 10) / 10),
    y: Math.max(0, Math.round(cropY * 10) / 10),
    w: Math.max(0, Math.round(cropW * 10) / 10),
    h: Math.max(0, Math.round(cropH * 10) / 10)
  }

  // Return null if this represents the full image (with tolerance for rounding)
  const tolerance = 0.2 // Allow for small rounding differences
  const isFullImage =
    x <= tolerance &&
    y <= tolerance &&
    w >= (100 - tolerance) &&
    h >= (100 - tolerance)

  return isFullImage ? null : { x, y, w, h }
}

// Calculate transform state to display a specific crop area
export const calculateStateForCropArea = (
  area: SoftcropArea,
  constraints: SoftcropConstraints
): { scale: number; position: Position } => {
  const { containerSize, imageDimensions, minScale, maxScale } = constraints

  const cropWidthInPixels = (area.w / 100) * imageDimensions.width
  const cropHeightInPixels = (area.h / 100) * imageDimensions.height

  const scaleX = containerSize.width / cropWidthInPixels
  const scaleY = containerSize.height / cropHeightInPixels
  let targetScale = Math.min(scaleX, scaleY)

  targetScale = Math.max(minScale, Math.min(maxScale, targetScale))

  const cropStartX = (area.x / 100) * imageDimensions.width
  const cropStartY = (area.y / 100) * imageDimensions.height

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

  const xPercent = (imageClickX / imageDimensions.width) * 100
  const yPercent = (imageClickY / imageDimensions.height) * 100

  if (xPercent >= 0 && xPercent <= 100 && yPercent >= 0 && yPercent <= 100) {
    return { x: xPercent, y: yPercent }
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
    x: imagePosition.x + (focusPoint.x / 100) * imageDimensions.width * scale,
    y: imagePosition.y + (focusPoint.y / 100) * imageDimensions.height * scale
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
    x: (constrainedImageX / imageDimensions.width) * 100,
    y: (constrainedImageY / imageDimensions.height) * 100
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
