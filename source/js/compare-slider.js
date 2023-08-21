const compareSlider = document.querySelector('.compare-slider');
const thumb = compareSlider.querySelector('.compare-slider__thumb');
let sliderWidth = compareSlider.offsetWidth;
/* Состояние нажатия на ползунок */
let pressed = false;

/* Обновляем положение элементов слайдера после изменения его размеров */
const resizeObserver = new ResizeObserver(updateSliderWidth);
resizeObserver.observe(compareSlider);

thumb.addEventListener('mousedown', thumbPressed);
window.addEventListener('mouseup', thumbReleased);
thumb.addEventListener('touchstart', thumbPressed);
window.addEventListener('touchend', thumbReleased);

function thumbPressed(e) {
  e.preventDefault();
  pressed = true;
  window.addEventListener('mousemove', thumbMoved);
  window.addEventListener('touchmove', thumbMoved);
}

function thumbReleased() {
  pressed = false;
}

function thumbMoved(e) {
  if (!pressed) {
    return false;
  }
  /* Получаем координату x указателя относительно слайдера */
  let pointerX = getPointerX(e);
  /* Предотвращаем перемещение ползунка за пределы слайдера */
  if (pointerX < 0) {
    pointerX = 0;
  }
  if (pointerX > sliderWidth) {
    pointerX = sliderWidth;
  }
  rearrangeSlider(pointerX);
}

function getPointerX(e) {
  e = (e.changedTouches) ? e.changedTouches[0] : e;
  /* Получаем координату x слайдера относительно viewport */
  const sliderX = compareSlider.getBoundingClientRect().x;
  /* Вычисляем координату x указателя относительно слайдера */
  let pointerX = e.pageX - sliderX;
  /* Учитываем горизонтальную прокрутку страницы */
  pointerX = pointerX - window.scrollX;
  return pointerX;
}

function rearrangeSlider(pointerX) {
  /* Изменяем размер контейнеров изображений с использованием grid-template-column */
  compareSlider.style.gridTemplateColumns = `${pointerX}px ${sliderWidth - pointerX}px`;
  /* Смещаем ползунок с учётом его ширины */
  thumb.style.justifySelf = 'start';
  thumb.style.marginLeft = `${pointerX - 20}px`;
}

function updateSliderWidth() {
  sliderWidth = compareSlider.offsetWidth;
  /* Центрируем ползунок */
  rearrangeSlider(sliderWidth / 2);
}
