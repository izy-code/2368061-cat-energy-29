/* Скрипт модифицирован Mutation Observer и размещён внутри <head> для ранней инициализации, предотвращающей CLS
в мобильной версии страниц из-за запаздывания скрытия меню после обычной инициализации скрипта */

// Функция показа/скрытия меню по нажатию на кнопку
function activateMenu() {
  const header = document.querySelector('.header');
  const menuToggle = header.querySelector('.header__toggle');
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
      console.log('Ошибка классов кнопки меню в header');
    }
  };
}

// MutationObserver, запускающий функцию активации меню после начального построения DOM
let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    // Проверяем появление в DOM кнопки меню с её visually-hidden содержимым
    if (mutation.target.classList.contains('visually-hidden')) {
      // Отключаем наблюдение и вызываем функцию активации меню
      observer.disconnect();
      activateMenu();
    }
  });
});

// Наблюдение за всеми изменениями в корне документа
observer.observe(document.documentElement, { childList: true, subtree: true });
