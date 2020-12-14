var activeIndex = 0, totalSlides, totalWidth, activeIndex = 0, timer, isClicked = false;
var slider = $('.slide-wrap');
var slide = $('.slide');
$(function () {
	totalSlides = slide.length;
	totalWidth = (slide.length)*slide.outerWidth();
	$(slider).prepend($('.slide').last().remove());
	slider.css({
		'width': totalWidth,
		'left': -slide.outerWidth()
	});
	$('.arrow-left').click(function(){
		if(timer) {
			clearInterval(timer);
			timer = null;
		}
		if(!isClicked) {
			isClicked = true;
			toLeft(activeIndex);
		}
	});
	$('.arrow-right').click(function() {
		if(timer) {
			clearInterval(timer);
			timer = null;
		}
		if(!isClicked) {
			isClicked = true;
			toRight(activeIndex);
		}
	});
	$('.bullet a').click(function() {
		if(timer) {
			clearInterval(timer);
			timer = null;
		}
		let index = $(this).index('.bullet a');
		if(index < activeIndex) {
			if(!isClicked){
				isClicked = true;
				slideTo(index);
			}
		}
		else {
			if(!isClicked){
				isClicked = true;
				slideTo(index);
			}
		}
	});
	$('.bullet').eq(activeIndex).addClass('active');
	timer = setInterval(()=>{
		toRight(activeIndex);
	}, 3000);
});

function toRight(index) {
	activeIndex = index;
	if(activeIndex > totalSlides - 1)
		activeIndex = 0;
	$('.bullet').removeClass('active');
	$('.bullet').eq(activeIndex).addClass('active');
	slider.animate({
		left: 0
	}, 1000, function() {
		if(!timer) {
			timer = setInterval(()=>{
				toRight();
			}, 3000);
		}
		isClicked = false;
		$(slider).prepend($('.slide').last().remove());
		slider.css('left', -slide.outerWidth());
		activeIndex++;
	});
}

function toLeft(index) {
	activeIndex = index;
	if(activeIndex < 0)
		activeIndex = totalSlides - 1;
	$('.bullet').removeClass('active');
	$('.bullet').eq(activeIndex).addClass('active');
	slider.animate({
		left: -slide.outerWidth()*2
	}, 1000, function() {
		if(!timer) {
			timer = setInterval(()=>{
				toRight(activeIndex);
			}, 3000);
		}
		isClicked = false;
		slider.append($('.slide').first().remove());
		slider.css('left', -slide.outerWidth());
		activeIndex--;
	});
}

function slideTo(index) {
	if(activeIndex > index) {
		toRight(index);
		activeIndex = index;
	}
	else {
		toLeft(index);
		activeIndex = index;
	}
}