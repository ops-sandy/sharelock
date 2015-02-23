$(document).ready(function(){
  $('.navbar a.menu').click(openMenu);
  $('.menu-overlay a.close').click(closeMenu);
});

$(window).load(onload);

function onload () {
  $('body').addClass('loaded');

  $('a.how-it-works').click(function(){
    $(this).fadeOut('fast');
    startHomeScenes();
    return false;
  });
}

function openMenu () {
  $('.menu-overlay').fadeIn();
  return false;
}

function closeMenu () {
  $('.menu-overlay').fadeOut();
  return false;
}
