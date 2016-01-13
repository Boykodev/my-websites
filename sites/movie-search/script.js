$(document).ready(function() {
	var objects = [];
	$('form').submit(function(event) {
		event.preventDefault();
		$.ajax({
			url: '/php/movie-search.php?title=' + $('input').val(),
			type: 'GET',
			success: function(json) {
				$('#list').html('');
				for (var i = 0; i < json['results'].length; i++) {
					var title = json['results'][i]['title'];
					var year = json['results'][i]['release_date'];
					var poster = json['results'][i]['poster_path'];
					var info = json['results'][i]['overview'];
					//if year is not null...
					if (year != null) {
						year = year.slice(0, 4);
						//...concatenate title with release year
						title += ' (' + year + ')';
					}
					var $movie = $('<li></li>');
					var template = $('#movie-template').html().trim();
					$movie.html(template);

					var posterPath;
					if (poster == null) {
						posterPath = 'assets/no-poster.jpg';
					} else {
						posterPath = 'http://image.tmdb.org/t/p/w500' + poster;
					}
					//adding a poster
					$movie.find('.poster').attr('alt', title)
					.attr('src', posterPath);
					//adding the title text
					$movie.find('.title').text(title);
					if (info == null) info = 'No info...';
					//adding a plot info
					$movie.find('.info').text(info);

					$('#list').append($movie);
				};
				if (json['results'].length == 0) showNoResults();
			},
			error: function() {
				$('#list').html('');
				showNoResults();
			}
		});
	});
	
	function showNoResults() {
		var $noResults = $('<p></p>')
		.text('Oops...no results.')
		.addClass('no-results');
		$('#list').append($noResults);
	}
});