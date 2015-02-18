$(document).ready(function() {
	$(".menu-trigger").click(function() {
		$(".menu").toggleClass("active");
	});

	var event = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) ? "touchstart" : "click";

	$(document).on(event, function (e) {
		if ( $(e.target).closest('.menu-trigger').length === 0 ) {
			$(".menu").removeClass("active");
		}
	});

	function getScrollbarWidth() {
		var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div></div>'); 
		$('body').append(div); 
		var w1 = $('div', div).innerWidth(); 
		div.css('overflow-y', 'auto'); 
		var w2 = $('div', div).innerWidth(); 
		$(div).remove(); 
		return (w1 - w2);
	}

	function mobileCheck() {
		var winWidth = $(window).width();
		if (winWidth<767-getScrollbarWidth()) {
			$("body > .container").removeAttr("style");
			$("body").css({ minHeight: $(window).height() });
		} else {
			$("body > .container").css({ minHeight: $(window).height()  - $("#header").height() });
		}
	};

	mobileCheck();
	$(window).resize(function() {
		mobileCheck();
	});

});