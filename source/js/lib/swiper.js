/* eslint-disable */
/* stylelint-disable */

// slider
var swiper = new Swiper('.new__slider-content', {
  slidesPerView: 2,
  spaceBetween: 30,
  slidesPerGroup: 2,
  loop: true,
  breakpoints: {
    1024: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
  },
  // loopFillGroupWithBlank: true,
  pagination: {
    el: '.new__slider-count',
    clickable: true,
    renderBullet: function (index, className) {
      return '<button class="' + className + '">' + (index + 1) + '</button>';
    },
  },
  navigation: {
    nextEl: '.new__slider-next-button',
    prevEl: '.new__slider-prev-button',
  },
});

swiper.slideNext();
