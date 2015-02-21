$(document).ready(function(){



    $('.navbar a.menu').click(openMenu);
    $('.menu-overlay a.close').click(closeMenu);

});

$(window).load(function() {
    $('body').addClass('loaded');
});


function openMenu(){
    $('.menu-overlay').fadeIn();
    return false;
}

function closeMenu(){
    $('.menu-overlay').fadeOut();
    return false;
}
