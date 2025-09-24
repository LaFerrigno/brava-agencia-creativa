$(document).ready(function () {
  $('#toggle-menu').click(function () {
    if ($(window).width() <= 1024) { // tablet y mobile
      $('.menu').toggleClass('desplegable-vertical');
      $('.menu').slideToggle();
    } else {
      // En desktop no debería pasar nada
      $('.menu').show();
    }
  });

  $('.menu a').click(function () {
    if ($(window).width() <= 1024) {
      $('.menu').slideUp();
      $('.menu').removeClass('desplegable-vertical');
    }
  });

  $(window).resize(function () {
    if ($(window).width() > 1024) {
      $('.menu').show();
      $('.menu').removeClass('desplegable-vertical');
    } else {
      $('.menu').hide();
    }
  }).trigger('resize');
});
