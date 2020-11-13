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

})();
