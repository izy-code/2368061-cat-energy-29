const compareSlider = document.querySelector('.compare-slider');
let thumb, sliderWidth, thumbPressed;

if (compareSlider) {
  thumb = compareSlider.querySelector('.compare-slider__thumb');
  sliderWidth = compareSlider.offsetWidth;
  // Состояние нажатия на ползунок
  thumbPressed = false;

  // Обновляем положение элементов слайдера после изменения его размеров
  const sliderObserver = new ResizeObserver(updateSliderWidth);
  sliderObserver.observe(compareSlider);

  compareSlider.addEventListener('mousedown', handleThumbPress);
  compareSlider.addEventListener('touchstart', handleThumbPress, { passive: true });
  window.addEventListener('mouseup', handleThumbRelease);
  window.addEventListener('touchend', handleThumbRelease);
}

function handleThumbPress(e) {
  thumbPressed = true;
  window.addEventListener('mousemove', handleThumbMove);
  window.addEventListener('touchmove', handleThumbMove);
  // Добавляем возможность сдвига ползунка нажатием не только на ползунке, но и слайдере
  handleThumbMove(e);
}

function handleThumbRelease() {
  thumbPressed = false;
  window.removeEventListener('mousemove', handleThumbMove);
  window.removeEventListener('touchmove', handleThumbMove);
}

function handleThumbMove(e) {
  if (!thumbPressed) {
    return false;
  }
  // Получаем координату x указателя относительно слайдера
  let pointerX = getPointerX(e);
  // Предотвращаем перемещение ползунка за пределы слайдера
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
  // Получаем координату x слайдера относительно viewport
  const sliderX = compareSlider.getBoundingClientRect().x;
  // Вычисляем координату x указателя относительно слайдера
  let pointerX = e.pageX - sliderX;
  // Учитываем горизонтальную прокрутку страницы
  pointerX = pointerX - window.scrollX;
  return pointerX;
}

function rearrangeSlider(pointerX) {
  // Изменяем размер контейнеров изображений с использованием grid-template-column
  compareSlider.style.gridTemplateColumns = `${pointerX}px 1fr`;
  // Смещаем ползунок с учётом его ширины
  thumb.style.justifySelf = 'start';
  thumb.style.marginLeft = `${pointerX - thumb.offsetWidth / 2}px`;
}

function updateSliderWidth() {
  sliderWidth = compareSlider.offsetWidth;
  // Центрируем ползунок
  rearrangeSlider(sliderWidth / 2);
}
