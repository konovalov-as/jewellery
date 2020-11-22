/* eslint-disable */
/* stylelint-disable */

// slider
var swiper = new Swiper('.new__slider-content', {
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 4,
  loop: true,
  // loopFillGroupWithBlank: true,
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  // },
  navigation: {
    nextEl: '.new__slider-next-button',
    prevEl: '.new__slider-prev-button',
  },
});
