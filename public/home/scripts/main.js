$(document).ready(function(){

    $('body').addClass('loaded');


    $('.navbar a.menu').click(openMenu);
    $('.menu-overlay a.close').click(closeMenu);

});

function openMenu(){
    $('.menu-overlay').fadeIn();
    return false;
}

function closeMenu(){
    $('.menu-overlay').fadeOut();
    return false;
}
