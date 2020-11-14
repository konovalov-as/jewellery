'use strict';

(function () {
  // menu toggle
  var headerContainer = document.querySelector('.page-header');
  var mainNav = headerContainer.querySelector('.main-nav');
  var mainMenuToggle = headerContainer.querySelector('.main-menu-toggle');

  mainMenuToggle.addEventListener('click', function () {
    mainNav.classList.toggle('main-nav--closed');
    mainNav.classList.toggle('main-nav--opened');
    headerContainer.classList.toggle('page-header--bg')
  });

  // hide social labels
  var socialLabels = document.querySelectorAll('.social__list .social__label');
  function hideLabels(action) {
    for (var i = 0; i < socialLabels.length; i++) {
      if (action === 'add') {
        socialLabels[i].classList.add('visually-hidden');
      }
      if (action === 'remove') {
        socialLabels[i].classList.remove('visually-hidden');
      }
    }
  }

  if (document.documentElement.clientWidth < 768) {
    hideLabels('remove');
  }

  var onresize = function () {
    if (document.documentElement.clientWidth < 768) {
      hideLabels('add');
    }
    if (document.documentElement.clientWidth > 768) {
      hideLabels('remove');
    }
  }
  window.addEventListener("resize", onresize);

  // faq accordion
  var faqToggleButtons = document.querySelectorAll('.faq__arrow-link');
  [].map.call(faqToggleButtons, function (faqButton) {
    faqButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      faqButton.parentNode.querySelector('.faq__answer').classList.toggle('faq__answer--hidden');
      faqButton.classList.toggle('faq__arrow-link--opened');
    });
  });

  // filter accordion
  var filterToggleButtons = document.querySelectorAll('.catalog__form-link');
  [].map.call(filterToggleButtons, function (filterButton) {
    filterButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      filterButton.parentNode.querySelector('ul').classList.toggle('catalog__form-list--hidden');
      filterButton.classList.toggle('catalog__form-link--opened');
    });
  });

  // filter open button
  var openFilter = document.querySelector('.catalog__form-button');
  var filterForm = document.querySelector('.catalog__form');
  if (openFilter) {
    openFilter.addEventListener('click', function () {
      filterForm.classList.toggle('catalog__form--hidden')
    });
  }

  // open modal
  var bodyPage = document.querySelector('.body');
  var cartModal = bodyPage.querySelector('.modal--cart');
  var addCartButton = bodyPage.querySelector('.product__add-cart');
  addCartButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    cartModal.classList.add('modal--show');
    bodyPage.classList.add('modal--open');
  });

  // close modal by close button
  var modalCloseButtons = document.querySelectorAll('.modal__close');
  for (var closeButton = 0; closeButton < modalCloseButtons.length; closeButton++) {
    modalCloseButtons[closeButton].addEventListener('click', function () {
      cartModal.classList.remove('modal--show');
      // successModal.classList.remove('modal--show');
      bodyPage.classList.remove('modal--open');
    });
  }

  // close modal by Esc key
  var modals = document.querySelectorAll('.modal');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode !== 27) {
      return;
    }
    for (var modalIndex = 0; modalIndex < modals.length; modalIndex++) {
      modals[modalIndex].classList.remove('modal--show');
    }
    bodyPage.classList.remove('modal--open');
  });

  // close modal by click overlay
  [].map.call(modals, function (modal) {
    modal.addEventListener('click', function (evt) {
      if (evt.target.classList[0] !== 'modal') {
        return;
      }
      modal.classList.remove('modal--show');
      bodyPage.classList.remove('modal--open');
    });
  });

})();
