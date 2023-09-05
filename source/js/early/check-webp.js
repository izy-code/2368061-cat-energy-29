/* Позволяет выбирать WebP изображения в свойстве background-image только для поддерживающих этот формат браузеров.
Размещён перед <link rel="stylesheet">, чтобы инициализироваться до применения стилей. */

function checkWebP(callback) {
  const webP = new Image();

  const event = () => {
    callback(webP.height === 2);
  };

  webP.addEventListener('load', event);

  webP.addEventListener('error', event);

  webP.src =
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

// Убирает в случае поддержки браузером формата WebP класс no-webp у тега html и добавляет webp
checkWebP((support) => {
  if (support) {
    document.documentElement.classList.remove('no-webp');
    document.documentElement.classList.add('webp');
  }
});
