'use strict';

(function () {
  var headerContainer = document.querySelector('.page-header');
  var mainNav = headerContainer.querySelector('.main-nav');
  var mainMenuToggle = headerContainer.querySelector('.main-menu-toggle');

  mainMenuToggle.addEventListener('click', function () {
    mainNav.classList.toggle('main-nav--closed');
    mainNav.classList.toggle('main-nav--opened');
    headerContainer.classList.toggle('page-header--bg')
  })
})();
