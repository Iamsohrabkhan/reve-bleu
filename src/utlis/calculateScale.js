function calculateScale(clipPathInset) {
  return 1 + (clipPathInset / 100); // Calculate the scale based on the inset percentage
}

export default calculateScale;
