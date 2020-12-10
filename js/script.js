var activeIndex = 0, totalSlides, totalWidth, activeIndex = 0, timer, isClicked = false;
var slider = $('.slide-wrap');
var slide = $('.slide');
$(function () {
	totalSlides = slide.length;
	totalWidth = (slide.length)*slide.outerWidth();
	slider.css({
		'width': totalWidth,
	});
	$('.arrow-left').click(function(){
		if(timer) {
			clearInterval(timer);
			timer = null;
		}
		if(!isClicked) {
			console.log(isClicked);
			isClicked = true;
			toLeft();
		}
	});
	$('.arrow-right').click(function() {
		if(timer) {
			clearInterval(timer);
			timer = null;
		}
		if(!isClicked) {
			isClicked = true;
			toRight();
		}
	});
	$('.bullet a').click(function() {
		let index = $(this).index('.bullet a');
		if($(this).index() < activeIndex) {
			toLeft(index);
		}
		else {
			toRight(index);
		}
	});
	$('.bullet').eq(activeIndex).addClass('active');
	timer = setInterval(()=>{
		toRight();
	}, 3000);
});

function toRight(index = -1) {
	activeIndex++;
	if(index != -1) {
		activeIndex = index;
	}
	if(activeIndex > totalSlides - 1)
		activeIndex = 0;
	$('.bullet').removeClass('active');
	$('.bullet').eq(activeIndex).addClass('active');
	slider.animate({
		left: -slide.outerWidth()*activeIndex
	}, 1000, function() {
		if(!timer) {
			timer = setInterval(()=>{
				toRight();
			}, 3000);
		}
		isClicked = true;
	});
}

function toLeft(index = -2) {
	activeIndex--;
	if(index != -2) {
		activeIndex = index;
	}
	if(activeIndex < 0)
		activeIndex = totalSlides - 1;
	$('.bullet').removeClass('active');
	$('.bullet').eq(activeIndex).addClass('active');
	slider.animate({
		left: -slide.outerWidth()*activeIndex
	}, 1000, function() {
		if(!timer) {
			timer = setInterval(()=>{
				toRight();
			}, 3000);
		}
		isClicked = false;
	});
}