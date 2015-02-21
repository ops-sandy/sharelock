$(document).ready(function(){

    $('.menu a.menu').click(openMenu);
    $('.menu-overlay a.close').click(closeMenu);

});

function openMenu(){
    $('.menu-overlay').fadeIn();
}

function closeMenu(){
    $('.menu-overlay').fadeOut();
}
