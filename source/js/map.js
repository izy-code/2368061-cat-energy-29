//Если подключить Google Maps API этот скрипт будет показывать интерактивную карту после её загрузки

const mapLink = document.querySelector('.map__link');
const mapResponsive = new
  google.maps.Map(document.querySelector('.map__responsive'),
    myOptions);

google.maps.event.addListenerOnce(mapResponsive, 'idle', function () {
  mapResponsive.style.zIndex = 1;
});
