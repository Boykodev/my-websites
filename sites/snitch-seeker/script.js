$(document).ready(function(){
	setInterval(function(){
			this.h = $(window).height() - 30;
			this.w = $(window).width() - 100;
			this.randomH = Math.floor(Math.random() * this.h);
			this.randomW = Math.floor(Math.random() * this.w);
			$('#snitch').animate({
				top: this.randomH,
				left: this.randomW
			}) 
		}, 100);	

	$('#snitch').click(function() {
		$('#snitch').remove();
		$('.snitch-caught').fadeIn('slow');
	})
});