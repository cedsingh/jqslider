var activeIndex = 0, totalSlides, totalWidth, activeIndex = 0;
var slider = $('.slide-wrap');
var slide = $('.slide');
$(function () {
	totalSlides = slide.length;
	totalWidth = slide.length*slide.outerWidth();
	slider.css('width', totalWidth);
	$('.arrow-left').click(function(){
		toLeft();
	});
	$('.arrow-right').click(function() {
		toRight();
	});
});

function toRight() {
	$('.slide').first().before($('.slide').last().css('margin-left', -slide.outerWidth()));
	slider.animate({
		marginLeft: slide.outerWidth()
	}, 1000, function() {
		$('.slide').last().remove();
	});
}

function toLeft() {
	slide.animate({
		marginRight: slide.outerWidth()
	}, 1000, function() {
		if(activeIndex < 0) {
			slider.append(slide.eq(totalSlides-1));
			activeIndex = totalSlides;
		}
		else {
			slider.append(slide.eq(activeIndex));
		}
		activeIndex--;
	});
}