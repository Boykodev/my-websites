$(document).ready(function() {
	var currentQuestion = 0;
	var inputFilled = false;

	$('.take-btn').one('click',  function(event) {
		event.preventDefault();

		$('label').click(function(event) {
			inputFilled = true;
		});

		$('.sorting-hat-container')
		.fadeOut('slow', function() {
			$('.take-btn').css('display', 'none');
			$('.next-btn').css('display', 'block');
			currentQuestion++;
			$('#q' + currentQuestion).fadeIn('slow');

			$('.next-btn').click(function(event) {
				event.preventDefault();
				if (currentQuestion == 12) {
					$('.next-btn').css('display', 'none');
					$('#q12').fadeOut('slow', function() {
						Sort();
						$('.sorting-hat-container').fadeIn('Slow');
					});
				} else {
					if (inputFilled) {
						$('#q' + currentQuestion)
						.fadeOut('slow', function() {
							currentQuestion++;
							$('#q' + currentQuestion).fadeIn('slow');
							if (currentQuestion == 12) $('.next-btn').text('Sort Me');
						});
						inputFilled = false;
					} else {
						alert('Check the answer!');
					}
				}

			});
			// end next button click listener
		});
		// end sorting hat fade out callback
	});
	// end jQuery ready function
});

function Sort() {
	var nHouseG = 0;
	var nHouseH = 0;
	var nHouseR = 0;
	var nHouseS = 0;

	var $quiz = $('input:checked');
	var values = [];

	for (var i = 0; i < 12; i++) {
		values[i] = $quiz.eq(i).val();
	}

	if(values[0] == 0)
	{nHouseG+=1; nHouseS+=2;}
	else if(values[0] == 1)
	{nHouseG+=1; nHouseS+=1;}
	else if(values[0] == 2)
	{nHouseH+=1; nHouseG+=1; nHouseR+=1;}
	else if(values[0] == 3)
	{nHouseH+=1; nHouseR+=2;}
	else if(values[0] == 4)
	{nHouseH+=1; nHouseR+=1;}

	if(values[1] == 0)
	{nHouseG+=1; nHouseH+=1; nHouseR+=1;}
	else if(values[1] == 1)
	{nHouseG+=1; nHouseS+=1;}
	else if(values[1] == 2)
	{nHouseG+=1; nHouseH+=2; nHouseR+=1;}
	else if(values[1] == 3)
	{nHouseH+=2; nHouseR+=2;}

	if(values[2] == 0)
	{nHouseG+=1; nHouseH+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[2] == 1)
	{nHouseG+=1; nHouseH+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[2] == 2)
	{nHouseG+=1; nHouseH+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[2] == 3)
	{nHouseG+=1; nHouseS+=1;}
	else if(values[2] == 4)
	{nHouseG+=1; nHouseS+=2;}

	if(values[3] == 0)
	{nHouseH+=2; nHouseR+=1;}
	else if(values[3] == 1)
	{nHouseR+=1; nHouseS+=1;}
	else if(values[3] == 2)
	{nHouseG+=2; nHouseR+=1;}
	else if(values[3] == 3)
	{nHouseG+=2;}
	else if(values[3] == 4)
	{nHouseS+=2;}

	if(values[4] == 0)
	{nHouseG+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[4] == 1)
	{nHouseS+=1;}
	else if(values[4] == 2)
	{nHouseG+=1; nHouseR+=1; nHouseS+=2;}
	else if(values[4] == 3)
	{nHouseG+=1; nHouseH+=2; nHouseR+=1;}
	else if(values[4] == 4)
	{nHouseG+=1; nHouseH+=1; nHouseR+=2;}

	if(values[5] == 0)
	{nHouseG+=2; nHouseR+=1; nHouseS+=1;}
	else if(values[5] == 1)
	{nHouseG+=2; nHouseR+=1; nHouseS+=1;}
	else if(values[5] == 2)
	{nHouseH+=1; nHouseR+=1;}
	else if(values[5] == 3)
	{nHouseG+=1; nHouseH+=2; nHouseR+=1;}
	else if(values[5] == 4)
	{nHouseG+=1; nHouseH+=2; nHouseR+=2;}

	if(values[6] == 0)
	{nHouseG+=1; nHouseR+=1; nHouseS+=2;}
	else if(values[6] == 1)
	{nHouseG+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[6] == 2)
	{nHouseG+=1; nHouseH+=1; nHouseR+=1;}
	else if(values[6] == 3)
	{nHouseG+=1; nHouseH+=2; nHouseR+=1;}
	else if(values[6] == 4)
	{nHouseG+=1; nHouseH+=2; nHouseR+=1;}
	else if(values[6] == 5)
	{nHouseG+=1; nHouseH+=1; nHouseR+=2;}

	if(values[7] == 0)
	{nHouseH+=2; nHouseR+=1; nHouseS+=1;}
	else if(values[7] == 1)
	{nHouseG+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[7] == 2)
	{nHouseG+=2; nHouseR+=1; nHouseS+=1;}

	if(values[8] == 0)
	{nHouseH+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[8] == 1)
	{nHouseH+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[8] == 2)
	{nHouseR+=1; nHouseS+=2;}
	else if(values[8] == 3)
	{nHouseH+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[8] == 4)
	{nHouseG+=2; nHouseR+=1; nHouseS+=1;}

	if(values[9] == 0)
	{nHouseG+=1; nHouseH+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[9] == 1)
	{nHouseG+=1; nHouseH+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[9] == 2)
	{nHouseG+=1; nHouseS+=1;}
	else if(values[9] == 3)
	{nHouseG+=1; nHouseH+=2; nHouseR+=1;}
	else if(values[9] == 4)
	{nHouseG+=1; nHouseH+=1; nHouseR+=2;}
	else if(values[9] == 5)
	{nHouseG+=1; nHouseR+=1; nHouseS+=2;}

	if(values[10] == 0)
	{nHouseG+=1; nHouseH+=1; nHouseS+=1;}
	else if(values[10] == 1)
	{nHouseG+=1; nHouseH+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[10] == 2)
	{nHouseG+=1; nHouseH+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[10] == 3)
	{nHouseG+=1; nHouseH+=1; nHouseR+=2; nHouseS+=1;}

	if(values[11] == 0)
	{nHouseG+=1; nHouseR+=1; nHouseS+=2;}
	else if(values[11] == 1)
	{nHouseG+=1; nHouseH+=1; nHouseR+=1; nHouseS+=2;}
	else if(values[11] == 2)
	{nHouseG+=1; nHouseH+=1; nHouseR+=1; nHouseS+=1;}
	else if(values[11] == 3)
	{nHouseG+=1; nHouseR+=1; nHouseH+=2; nHouseS+=1;}

	var list = {"Gryffindor": nHouseG, "Hufflepuff": nHouseH, "Ravenclaw": nHouseR, "Slytherin": nHouseS};
	var sorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]});
	$('.sorting-hat-container').css('font-size', '50px');
	$('.sorting-hat-container span').html('You have been sorted to the<br>' + sorted[3] + ' House!');
}