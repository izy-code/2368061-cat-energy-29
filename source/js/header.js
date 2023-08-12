const header = document.querySelector('.header');
const menuToggle = document.querySelector('.header__toggle');
const menuToggleText = menuToggle.querySelector('.visually-hidden');

header.classList.add('header--js-menu_closed');

menuToggle.onclick = () => {
  header.classList.toggle('header--js-menu_closed');
  header.classList.toggle('header--js-menu_opened');
  if (header.classList.contains('header--js-menu_opened')) {
    menuToggleText.textContent = 'Закрыть меню';
  }
  else if (header.classList.contains('header--js-menu_closed')) {
    menuToggleText.textContent = 'Открыть меню';
  }
  else {
    console.log("Ошибка классов кнопки меню в header");
  }
};
