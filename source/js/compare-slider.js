const compareSlider = document.querySelector('.compare-slider');
const thumb = compareSlider.querySelector('.compare-slider__thumb');
const sliderWidth = compareSlider.offsetWidth;
let pressed = false;

/* Execute a function when the mouse button is pressed: */
thumb.addEventListener('mousedown', thumbPressed);
/* And another function when the mouse button is released: */
window.addEventListener('mouseup', thumbReleased);
/* Or touched (for touch screens) */
thumb.addEventListener('touchstart', thumbPressed);
/* And released (for touch screens) */
window.addEventListener('touchend', thumbReleased);

function thumbPressed(e) {
  /* Prevent any other actions that may occur when moving over the image: */
  e.preventDefault();
  /* The thumb is now clicked and ready to move: */
  pressed = true;
  /* Execute a function when the thumb is moved: */
  window.addEventListener('mousemove', thumbMoved);
  window.addEventListener('touchmove', thumbMoved);
}

function thumbReleased() {
  /* The thumb is no longer clicked: */
  pressed = false;
}

function thumbMoved(e) {
  /* If the thumb is no longer clicked, exit this function: */
  if (!pressed) {
    return false;
  }
  /* Get the pointer's x-coordinate relative to the slider: */
  let pointerX = getPointerX(e);
  /* Prevent the thumb from being positioned outside the slider: */
  if (pointerX < 0) {
    pointerX = 0;
  }
  if (pointerX > sliderWidth) {
    pointerX = sliderWidth;
  }
  /* Execute a function that will resize image containers according to the pointer: */
  rearrangeSlider(pointerX);
}

function getPointerX(e) {
  e = (e.changedTouches) ? e.changedTouches[0] : e;
  /* Get the slider's x-coordinate relative to the viewport: */
  const sliderX = compareSlider.getBoundingClientRect().x;
  /* Calculate the pointer's x-coordinate relative to the slider: */
  let pointerX = e.pageX - sliderX;
  /* Consider any page horizontal scrolling: */
  pointerX = pointerX - window.scrollX;
  return pointerX;
}

function rearrangeSlider(pointerX) {
  /* Resize image containers using grid templates: */
  compareSlider.style.gridTemplateColumns = `${pointerX}px ${sliderWidth - pointerX}px`;
  /* Position the thumb: */
  thumb.style.justifySelf = 'start';
  thumb.style.marginLeft = `${pointerX - 20}px`;
}
