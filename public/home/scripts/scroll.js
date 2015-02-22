
var controller;

window.onload = function(){
    setTimeout(function(){
        window.scrollTo(0,0);
    }, 0);
}

$(document).ready(function(){

    controller = new ScrollMagic();

    scene0();
    scene1();
    scene2();
    scene3();
    scene4();
    scene5();
    scene6();
    scene7();
    scene8();
    scene9();
    scene10();
    scene11();
});


function scene0(){

    var timeline = new TimelineMax()

        .add(TweenMax.from('.home', 1.5, {
            opacity: 0
        }))

        .add(TweenMax.from('.main-footer, .navbar, .logo', 1, {
            opacity: 0,
            delay: 1
        }))
}

function scene1(){

    var tween_p1 = TweenMax.to('.phone.p1', 1, {
        marginLeft: -345
    });

    var tween_p2 = TweenMax.to('.phone.p2', 1, {
        opacity: 0
    });

    var phone_out = TweenMax.to('.phone.p1 .content.c1', 1, {
        left: '-100%',
        opacity: 0
    });

    var phone_in = TweenMax.to('.phone.p1 .content.c2', 1, {
        left: 0,
        opacity: 1
    });


    var timeline = new TimelineMax()
        .add(tween_p1)
        .add(tween_p2, 0)
        .add(phone_in, 0)
        .add(phone_out, 0)

    if(isMobile()){
        
        timeline.to('.stores-1', 1, {
            opacity: 0
        })
    }

    timeline.to('.step-bar', 1, {
        opacity: 1
    });

    if(!isMobile()){

        var tween_text = TweenMax.to('.text', 1, {
            marginLeft: 0,
            left: '62%'
        });

        var tween_stores_1 = TweenMax.to('.stores-1', 1, {
            opacity: 0
        });


        var tween_stores_2 = TweenMax.to('.stores-2', 1, {
            display: 'block'
        });


        timeline.add(tween_text, 0)
        timeline.add(tween_stores_1, 0)
        timeline.add(tween_stores_2, 1)
    }

    timeline
        .to('.text.t1', 1, {
            marginTop: -200,
            opacity: 0
        }, 2)
        .fromTo('.text.t2', 1, {
            marginTop: 0,
            opacity: 0
        }, {
            opacity: 1,
            marginTop: -150
        }, 2)

    var scene = new ScrollScene({
        duration: 1000
    })
    .setTween(timeline)
    .addTo(controller);

}

function scene2(){

    tween_app = TweenMax.to('.phone.p1 .app.a1', 1,{
        marginTop: '-35%'
    });

    tween_keyboard = TweenMax.from('.phone.p1 .keyboard', 1, {
        marginBottom: -182
    })

    typing = TweenMax.to('.phone.p1 .c2 .text-input', 2, {
        text: "VISA 1234 3456 5678 6789"
    });

    add_check = TweenMax.delayedCall(0, function(){
        $('.phone.p1 .app.a1 .c2 .text-input').addClass('check');
        $('.step-bar').attr('class', 'step-bar s1b');
    });

    rm_check = TweenMax.delayedCall(0, function(){
        $('.phone.p1 .app.a1 .text-input').removeClass('check');
        $('.step-bar').attr('class', 'step-bar');
    });

    tween_app2 = TweenMax.to('.phone.p1 .app.a1', 1,{
        marginTop: 0
    });

    tween_keyboard2 = TweenMax.to('.phone.p1 .keyboard', 1, {
        marginBottom: -182
    })

    var timeline = new TimelineMax()
        .add(tween_app, 0)
        .add(tween_keyboard, 0)
        .add(rm_check, 0.99)
        .add(typing, 1)
        .add(add_check, 1)
        .add(tween_app2, 4)
        .add(tween_keyboard2, 4)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .content.c2 .next').removeClass('click');
        }), 2.9)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .content.c2 .next').addClass('click');
        }), 4.5)

    var scene = new ScrollScene({
        duration: 1000,
        offset: 1100
    })
    .setTween(timeline)
    .addTo(controller);

}

function scene3(){

    var timeline = new TimelineMax();

    timeline
        .to('.phone.p1 .content.c2', 1, {
            left: '-100%',
            opacity: 0
        }, 0)
        .to('.phone.p1 .content.c3', 1, {
            left: 0,
            opacity: 1
        }, 0)
        .to('.text.t2', 1, {
            marginTop: -200,
            opacity: 0
        }, 0)
        .fromTo('.text.t3', 1, {
            marginTop: 0,
            opacity: 0
        }, {
            opacity: 1,
            marginTop: -150
        }, 0)
        .to('.phone.p1 .app.a1', 1,{
            marginTop: '-35%'
        }, 1)
        .to('.phone.p1 .keyboard', 1, {
            marginBottom: 0
        }, 1)
        .to('.phone.p1 .c3 .text-input', 2, {
            text: "hello@evilrabb.it"
        }, 2)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .app.a1 .c3 .text-input').addClass('check');
            $('.step-bar').attr('class', 'step-bar s2b');
        }), 4)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .app.a1 .c3 .text-input').removeClass('check');
            $('.step-bar').attr('class', 'step-bar s2a');
        }), 3.99)
        .to('.phone.p1 .app.a1', 1,{
            marginTop: 0
        }, 4)
        .to('.phone.p1 .keyboard', 1, {
            marginBottom: -182
        }, 4)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s1b');
        }), 0)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s2a');
        }), 0.1)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .content.c3 .next').removeClass('click');
        }), 2.9)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .content.c3 .next').addClass('click');
        }), 4.5);

    var scene = new ScrollScene({
        duration: 1000,
        offset: 2200
    })
    .setTween(timeline)
    .addTo(controller);

}

function scene4(){

    var timeline = new TimelineMax();

    timeline
        .to('.phone.p1 .app.a1', 1, {
            left: '-100%',
            opacity: 0
        }, 0)
        .fromTo('.phone.p1 .app.a2', 1, {
            left: '100%',
            opacity: 0
        }, {
            left: 0,
            opacity: 1
        }, 0)
        .to('.text.t3', 1, {
            marginTop: -200,
            opacity: 0
        }, 0)
        .fromTo('.text.t4', 1, {
            marginTop: 0,
            opacity: 0
        }, {
            opacity: 1,
            marginTop: -150
        }, 0)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s2b');
        }), 0)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s3a');
        }), 0.1);

    var scene = new ScrollScene({
        duration: 400,
        offset: 3300
    })
    .setTween(timeline)
    .addTo(controller);

}

function scene5(){

    var timeline = new TimelineMax();

    timeline
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .app.a1 .content').css({
                left: '-100%',
                opacity: 0
            });
            $('.phone.p1 .app.a1 .content.c3').css({
                left: 0,
                opacity: 1
            });
        }), 0)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .app.a1 .content').css({
                left: '-100%',
                opacity: 0
            });
            $('.phone.p1 .app.a1 .content.c1').css({
                left: 0,
                opacity: 1
            });
            $('.phone.p1 .app.a1').css({
                left: '100%',
                opacity: 0
            });
        }), 0.1)
        .to('.phone.p1 .app.a2', 1, {
            left: '-100%',
            opacity: 0
        }, 0.1)
        .to('.phone.p1 .app.a1', 1, {
            left: 0,
            opacity: 1
        }, 0.1)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .content.c1 .ripple.share').removeClass('click');
        }), 1)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .content.c1 .ripple.share').addClass('click');
        }), 1.1)
        .to('.phone.p1 .app.a1 .share-menu', 3, {
            bottom: 0
        })
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .app.a1 .share-menu .whatsapp').removeClass('click');
        }), 2.9)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .app.a1 .share-menu .whatsapp').addClass('click');
        }), 3)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s3a');
        }), 0.9)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s3b');
        }), 1);

    var scene = new ScrollScene({
        duration: 1000,
        offset: 4200
    })
    .setTween(timeline)
    .addTo(controller);

}

function scene6(){

    var timeline = new TimelineMax();

    timeline
        .to('.phone.p1 .app.a1', 1, {
            opacity: 0
        }, 0)
        .to('.phone.p1 .screen', 1, {
            backgroundColor: "#273636"
        }, 0)
        .fromTo('.phone.p1 .app.a3', 1, {
            left: 0,
            transform: 'scale(0.8)',
            opacity: 0
        }, {
            transform: 'scale(1)',
            opacity: 1
        }, 0)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s3b');
        }), 0)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s3c');
        }), 0.1);

    var scene = new ScrollScene({
        duration: 400,
        offset: 5300
    })
    .setTween(timeline)
    .addTo(controller);

}

function scene7(){

    var timeline = new TimelineMax();

    timeline
        .to('.phone.p1 .app.a3', 1, {
            opacity: 0
        }, 0)
        .fromTo('.phone.p1 .app.a4', 1, {
            left: 0,
            transform: 'scale(0.8)',
            opacity: 0
        }, {
            transform: 'scale(1)',
            opacity: 1
        }, 0)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s3c');
        }), 0)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s3d');
        }), 0.1);

    var scene = new ScrollScene({
        duration: 400,
        offset: 6000
    })
    .setTween(timeline)
    .addTo(controller);

}

function scene8(){

    var timeline = new TimelineMax();

    if(!isMobile()){
        timeline
            .to('.phone.p1', 1, {
                transform: 'scale(0.8)',
                marginLeft: -345,
                left: '24%',
                marginTop: -350
            })
            .to('.arrow', 1, {
                opacity: 1
            })
            .to('.phone.p3', 1, {
                opacity: 1
            });
    }else{
        timeline
            .to('.phone.p1', 1, {
                transform: 'scale(0.5)',
                marginLeft: -345,
                top: '50%',
                left: '24%',
                marginTop: -350
            })
            .to('.arrow', 1, {
                opacity: 1
            })
            .to('.phone.p3', 1, {
                opacity: 1
            })
    }

    timeline.to('.step-bar', 1, {
        opacity: 0
    }, 0)
    .add(TweenMax.delayedCall(0, function(){
        $('.phone.p3 .app .login.fb').removeClass('click');
    }), 2.9)
    .add(TweenMax.delayedCall(0, function(){
        $('.phone.p3 .app .login.fb').addClass('click');
    }), 3);

    if(isMobile()){
        timeline.to('.stores', 1, {
            opacity: 1
        });
    }

    var scene = new ScrollScene({
        duration: 1000,
        offset: 7000
    })
    .setTween(timeline)
    .addTo(controller);


}

function scene9(){

    var timeline = new TimelineMax();

    timeline
        .to('.phone.p3 .app.a1', 1, {
            left: '-100%',
            opacity: 0
        }, 0)
        .fromTo('.phone.p3 .app.a2', 1, {
            left: '100%',
            opacity: 0
        }, {
            left: 0,
            opacity: 1
        }, 0);

    var scene = new ScrollScene({
        duration: 400,
        offset: 8400
    })
    .setTween(timeline)
    .addTo(controller);

}

function scene10(){

    var timeline = new TimelineMax();

    timeline
        .to('.phone.p3 .app.a2', 1, {
            left: '-100%',
            opacity: 0
        }, 0)
        .fromTo('.phone.p3 .app.a3', 1, {
            left: '100%',
            opacity: 0
        }, {
            left: 0,
            opacity: 1
        }, 0);

    var scene = new ScrollScene({
        duration: 400,
        offset: 9400
    })
    .setTween(timeline)
    .addTo(controller);

}

function scene11(){

    var timeline = new TimelineMax();

    timeline
        .to('.text.t4, .arrow', 1, {
            marginTop: -200,
            opacity: 0
        }, 0)
        .to('.phone.p1', 1.5, {
            top: '20%',
            opacity: 0
        }, 0.5)
        .to('.phone.p3', 1, {
            top: '20%',
            opacity: 0
        }, 1)
        .from('.laptop', 2, {
            opacity: 0,
            marginTop: -100
        }, 3);

    if(!isMobile()){
        timeline
            .fromTo('.text.t5', 4, {
                marginTop: 0,
                opacity: 0,
                left: '10%'
            }, {
                opacity: 1,
                marginTop: -100,
                left: '10%'
            }, 2);
    }else{
        timeline
            .fromTo('.text.t5', 4, {
                marginTop: 0,
                opacity: 0,
            }, {
                opacity: 1,
                marginTop: -100,
            }, 2);
    }

    var scene = new ScrollScene({
        duration: 500,
        offset: 10000
    })
    .setTween(timeline)
    .addTo(controller);

}

function isMobile(){
    return window.innerWidth < 950;
}
