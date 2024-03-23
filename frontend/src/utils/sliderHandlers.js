// export const handleNext = (setSliderPosition, sliderPosition) => {
//   const elementWidth = document.querySelector(
//     ".slider-container, .FirstLayerWrapper"
//   ).offsetWidth;
//   const element2Width = document.querySelector(
//     ".slider-contents, .Collection"
//   ).offsetWidth;
//   if (elementWidth < element2Width + sliderPosition)
//     setSliderPosition(sliderPosition - 200);
// };
// export const handlePrevious = (setSliderPosition, sliderPosition) => {
//   if (sliderPosition !== 0) setSliderPosition(sliderPosition + 200);
// };

export const handleNext = ( setSliderPosition, sliderPosition) => {
  const elements = document.querySelectorAll(
    ".slider-container, .FirstLayerWrapper"
  );
  elements.forEach((element) => {
    const elementWidth = element.offsetWidth;
    const element2Width = document.querySelector(
      ".slider-contents, .Collection"
    ).offsetWidth;
    if (elementWidth < element2Width + sliderPosition)
      setSliderPosition(sliderPosition - 200);
  });
};

export const handlePrevious = (setSliderPosition, sliderPosition) => {
  const elements = document.querySelectorAll(
    ".slider-container, .FirstLayerWrapper"
  );
  elements.forEach((element) => {
    if (sliderPosition !== 0) setSliderPosition(sliderPosition + 200);
  });
};
