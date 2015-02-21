$(document).ready(function(){



    $('.navbar a.menu').click(openMenu);
    $('.menu-overlay a.close').click(closeMenu);




});

$(window).load(function() {

  $('body').addClass('loaded');


  $('a.how-it-works').click(function(){


      $(this).fadeOut('fast');
      
      $('body').delay( 100 ).animate({
        scrollTop: $('body').get(0).scrollHeight
      }, 60500);

      return false;
  });

});


function openMenu(){
    $('.menu-overlay').fadeIn();
    return false;
}

function closeMenu(){
    $('.menu-overlay').fadeOut();
    return false;
}
