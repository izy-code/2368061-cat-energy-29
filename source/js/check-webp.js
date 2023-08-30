function checkWebP(callback) {
  let webP = new Image();

  const event = () => {
    callback(webP.height === 2);
  };

  webP.addEventListener("load", event);

  webP.addEventListener("error", event);

  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

checkWebP(function (support) {
  if (support) {
    document.body.classList.add("webp");
  }
});
