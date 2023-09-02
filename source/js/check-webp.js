/* Проверяет поддержку браузером формата изображений WebP.
Позволяет выбирать подходящее изображение для background-image.
Размещён перед <link rel="stylesheet">, чтобы выполниться до применения стилей. */

function checkWebP(callback) {
  let webP = new Image();

  const event = () => {
    callback(webP.height === 2);
  };

  webP.addEventListener('load', event);

  webP.addEventListener('error', event);

  webP.src =
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

checkWebP(function (support) {
  if (support) {
    document.documentElement.classList.remove('no-webp');
    document.documentElement.classList.add('webp');
  }
});
