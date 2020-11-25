/* eslint-disable */
/* stylelint-disable */

// slider
var sliderContainer = document.querySelector('.new__slider-content');
if (sliderContainer) {
  var swiper = new Swiper('.new__slider-content', {
    slidesPerView: 2,
    spaceBetween: 30,
    slidesPerGroup: 2,
    loop: true,
    breakpoints: {
      0: {
        pagination: {
          el: '.new__slider-count',
          clickable: true,
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            // return '<span>'+ (index + 1) + '</span>' + ' of ' + '<span>' + (className) + '</span>';
            // return '<span>'+ total + '</span>' + ' of ' + '<span>' + totalClass + '</span>';
            // return '<span class="' + bulletActiveClass + '">' + total + '</span>' + ' of ' + '<span class="' + bulletClass + '">' + totalClass + '</span>';
            // return '<button class="' + className + '" aria-label="Slide ' + (index + 1) + '">' + (index + 1) + '</button>';
            return current + ' of ' + total;
          },
        },
      },
      768: {
        pagination: {
          el: '.new__slider-count',
          clickable: true,
          renderBullet: function (index, className) {
            return '<button class="' + className + '" aria-label="Slide ' + (index + 1) + '">' + (index + 1) + '</button>';
          },
        },
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        pagination: {
          el: '.new__slider-count',
          clickable: true,
          renderBullet: function (index, className) {
            return '<button class="' + className + '" aria-label="Slide ' + (index + 1) + '">' + (index + 1) + '</button>';
          },
        },
      },
    },
    // loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '.new__slider-next-button',
      prevEl: '.new__slider-prev-button',
    },
  });

  swiper.slideNext();
}
