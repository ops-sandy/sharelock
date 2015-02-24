
var scenes = {};

$(document).ready(function(){
    scene0();
    scenes['s1'] = scene1();
    scenes['s2'] = scene2();
    scenes['s3'] = scene3();
    scenes['s4'] = scene4();
    scenes['s5'] = scene5();
    scenes['s6'] = scene6();
    scenes['s7'] = scene7();
    scenes['s8'] = scene8();
    scenes['s9'] = scene9();
    scenes['s10'] = scene10();
    scenes['s11'] = scene11();
    scenes['s12'] = scene12();
});

function startHomeScenes() {
    scenes['s1'].resume();
}

function scene0 () {

    var timeline = new TimelineMax();

    timeline
    .add(TweenMax.from('.home', 1.5, {
        opacity: 0
    }))
    .add(TweenMax.from('.delayed', 1, {
        opacity: 0,
        delay: 1
    }))
}

function scene1 () {

    var tween_p1 = TweenMax.to('.phone.p1', 1, {
        marginLeft: -345
    });

    var tween_p2 = TweenMax.to('.phone.p2', 1, {
        opacity: 0
    });

    var phone_in = TweenMax.to('.phone.p1 .content.c2', 1, {
        left: 0,
        opacity: 1
    });

    var phone_out = TweenMax.to('.phone.p1 .content.c1', 1, {
        left: '-100%',
        opacity: 0
    });

    var timeline = new TimelineMax({ onComplete: nextScene('s2') })
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

    timeline.pause();
    return timeline;
}

function scene2 () {

    var tween_app = TweenMax.to('.phone.p1 .app.a1', 1,{
        marginTop: '-35%'
    });

    var tween_keyboard = TweenMax.from('.phone.p1 .keyboard', 1, {
        marginBottom: -182
    })

    var typing = TweenMax.to('.phone.p1 .c2 .text-input', 2, {
        text: "VISA 1234 3456 5678 6789"
    });

    var add_check = TweenMax.delayedCall(0, function(){
        $('.phone.p1 .app.a1 .c2 .text-input').addClass('check');
        $('.step-bar').attr('class', 'step-bar s1b');
    });

    var rm_check = TweenMax.delayedCall(0, function(){
        $('.phone.p1 .app.a1 .text-input').removeClass('check');
        $('.step-bar').attr('class', 'step-bar');
    });

    var tween_app2 = TweenMax.to('.phone.p1 .app.a1', 1,{
        marginTop: 0
    });

    var tween_keyboard2 = TweenMax.to('.phone.p1 .keyboard', 1, {
        marginBottom: -182
    })

    var timeline = new TimelineMax({ onComplete: nextScene('s3') })
        .add(tween_app, 0)
        .add(tween_keyboard, 0)
        .add(rm_check, 0.99)
        .add(typing, 1)
        .add(add_check, 2.9)
        .add(tween_app2, 3)
        .add(tween_keyboard2, 3)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .content.c2 .next').removeClass('click');
        }), 2.5)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .content.c2 .next').addClass('click');
        }), 3.5)

    timeline.pause();
    return timeline;
}

function scene3 () {

    var timeline = new TimelineMax({ onComplete: nextScene('s4') });

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

    timeline.pause();
    return timeline;
}

function scene4 () {

    var timeline = new TimelineMax({ onComplete: nextScene('s5') });

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

    timeline.pause();
    return timeline;
}

function scene5 () {

    var timeline = new TimelineMax({ onComplete: nextScene('s6') });

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
        .to('.phone.p1 .app.a1 .share-menu', 1.2, {
            bottom: 0
        })
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .app.a1 .share-menu .whatsapp').removeClass('click');
        }), 2)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .app.a1 .share-menu .whatsapp').addClass('click');
        }), 2)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s3a');
        }), 0.9)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s3b');
        }), 1);

    timeline.pause();
    return timeline;
}

function scene6 () {

    var timeline = new TimelineMax({ onComplete: nextScene('s7') });

    timeline
        .to('.phone.p1 .app.a1', 1.5, {
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
            $('.phone.p1 .app.a3 .ripple.contact').removeClass('click');
        }), 1)
        .add(TweenMax.delayedCall(0, function(){
            $('.phone.p1 .app.a3 .ripple.contact').addClass('click');
        }), 1.1)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s3b');
        }), 0)
        .add(TweenMax.delayedCall(0, function(){
            $('.step-bar').attr('class', 'step-bar s3c');
        }), 0.1);

    timeline.pause();
    return timeline;
}

function scene7 () {

    var timeline = new TimelineMax({ onComplete: nextScene('s8') });

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

    timeline.pause();
    return timeline;
}

function scene8 () {

    var timeline = new TimelineMax({ onComplete: nextScene('s9') });

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

    timeline.pause();
    return timeline;
}

function scene9 () {

    var timeline = new TimelineMax({ onComplete: nextScene('s10') });

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

    timeline.pause();
    return timeline;
}

function scene10 () {

    var timeline = new TimelineMax({ onComplete: nextScene('s11') });

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

    timeline.pause();
    return timeline;
}

function scene11 () {

    var timeline = new TimelineMax({ onComplete: waitForVideo });

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
        .from('.laptop', 1, {
            opacity: 0,
            marginTop: -100
        }, 3);

    if(!isMobile()){
        timeline
            .fromTo('.text.t5', 2, {
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
            .fromTo('.text.t5', 2, {
                marginTop: 0,
                opacity: 0,
            }, {
                opacity: 1,
                marginTop: -100,
            }, 2);
    }

    timeline.pause();
    return timeline;

}

function waitForVideo () {
    // and then call
    setTimeout(function () {
        nextScene('s12')();
    }, 4000);
}

function scene12 () {

    var timeline = new TimelineMax({ onComplete: homeScenesComplete });

    timeline
        .to('.text.t5, .laptop', 1, {
            opacity: 0
        }, 0)
        .from('.step-dw .step-dw-left', 2, {
            opacity: 0,
            marginBottom: -100
        }, 1)
        .from('.step-dw .step-dw-right', 2, {
            opacity: 0,
            marginBottom: -100
        }, 2);



    timeline.pause();
    return timeline;

}
function isMobile(){
    return window.innerWidth < 950;
}

function homeScenesComplete() {
    console.log('scenes completed succesfully!');
}

function nextScene(scene) {
    return function resumeScene() {
        scenes[scene].resume();
    }
}
