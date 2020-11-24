'use strict';

(function () {
  // menu toggle
  var headerContainer = document.querySelector('.page-header');
  var mainNav = headerContainer.querySelector('.main-nav');
  var mainMenuToggle = headerContainer.querySelector('.main-menu-toggle');

  mainMenuToggle.addEventListener('click', function () {
    mainNav.classList.toggle('main-nav--closed');
    mainNav.classList.toggle('main-nav--opened');
    headerContainer.classList.toggle('page-header--bg');
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
  };
  window.addEventListener('resize', onresize);

  // faq accordion
  var faqToggleButtons = document.querySelectorAll('.faq__arrow-link');
  var faqAnswers = document.querySelectorAll('.faq__answer');
  [].map.call(faqAnswers, function (faqAnswer) {
    faqAnswer.classList.add('faq__answer--hidden');
  });

  [].map.call(faqToggleButtons, function (faqButton) {
    faqButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      faqButton.parentNode.querySelector('.faq__answer').classList.toggle('faq__answer--hidden');
      faqButton.classList.toggle('faq__arrow-link--opened');
    });
  });

  // filter accordion
  var filterContainers = document.querySelectorAll('.catalog__form-list--js');
  [].map.call(filterContainers, function (filterContainer) {
    filterContainer.classList.add('catalog__form-list--hidden');
  });
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
      filterForm.classList.remove('catalog__form--hidden');
    });
  }

  // filter close button
  if (filterForm) {
    var closeFilterButton = filterForm.querySelector('.catalog__form-close button');
    closeFilterButton.addEventListener('click', function () {
      filterForm.classList.add('catalog__form--hidden');
    });
  }

  // open cart modal
  var bodyPage = document.querySelector('.body');
  var modals = bodyPage.querySelectorAll('.modal');
  var cartModal = bodyPage.querySelector('.modal--cart');
  var addCartButton = bodyPage.querySelector('.product__add-cart');
  if (addCartButton) {
    addCartButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      cartModal.classList.add('modal--show');
      bodyPage.classList.add('modal--open');
    });
  }

  // open login modal
  var loginModal = bodyPage.querySelector('.modal--login');
  var loginButton = bodyPage.querySelector('.user-menu__link--login');
  var loginForm = bodyPage.querySelector('.login__form');
  var emailInput = loginForm.querySelector('.login__form-field-email input');
  var passwordInput = loginForm.querySelector('.login__form-field-password input');

  if (loginButton) {
    loginButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      loginModal.classList.add('modal--show');
      bodyPage.classList.add('modal--open');
      loginModal.value = localStorage.getItem('emailInput');
      emailInput.focus();
    });
  }

  // close modal by close button
  var modalCloseButtons = document.querySelectorAll('.modal__close');
  for (var closeButton = 0; closeButton < modalCloseButtons.length; closeButton++) {
    modalCloseButtons[closeButton].addEventListener('click', function () {
      for (var modalIndex = 0; modalIndex < modals.length; modalIndex++) {
        modals[modalIndex].classList.remove('modal--show');
        // successModal.classList.remove('modal--show');
        bodyPage.classList.remove('modal--open');
      }
    });
  }

  // close modal by Esc key
  // var modals = document.querySelectorAll('.modal');
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

  // validate form
  emailInput.addEventListener('invalid', function () {
    validateEmail(emailInput);
  });

  emailInput.addEventListener('input', function () {
    validateEmail(emailInput);
  });

  passwordInput.addEventListener('invalid', function () {
    validatePassword(passwordInput);
  });

  passwordInput.addEventListener('input', function () {
    validatePassword(passwordInput);
  });

  var validateEmail = function (fieldName) {
    if (fieldName.validity.valueMissing) {
      fieldName.setCustomValidity('Do you have an email?');
      return;
    }
    if (fieldName.validity.typeMismatch) {
      fieldName.setCustomValidity('Please enter a correct email');
      return;
    }
    fieldName.setCustomValidity('');
    localStorage.setItem('emailInput', fieldName.value);
  };

  var validatePassword = function (fieldName) {
    if (fieldName.validity.valueMissing) {
      fieldName.setCustomValidity('This field is required');
      return;
    }
    fieldName.setCustomValidity('');
  };

  // sign-up
  var signUpForm = document.querySelector('.sign-up-form');
  var singUpEmail = signUpForm.querySelector('.sign-up-form input');
  singUpEmail.value = localStorage.getItem('emailInput');

})();
