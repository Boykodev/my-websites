$(document).ready(function() {
  /* Does your browser support geolocation? */
  if ("geolocation" in navigator) {
    $('.js-geolocation').show(); 
  } else {
    $('.js-geolocation').hide();
  }
  /* Where in the world are you? */
  $('.js-geolocation').on('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      //load weather using your lat/lng coordinates
      loadWeather(position.coords.latitude+','+position.coords.longitude);
      checkForFirstShow();
    });
  });

  $('#show').click(function(event) {
    var $location = $('#location');
    if ($location.val() != '') {
      loadWeather($location.val(), '');
      checkForFirstShow();
      $location.val('');
    }
  });

  $('#search').submit(function(event) {
    event.preventDefault();
    $('#show').trigger('click');
  });
});

var checkForFirstShow = (function(){
  // used to clear the header the first time
  var firstShow = true;
  return function() {
    if (firstShow) {
      $('#header').slideUp('slow', function() {
        $('#weather').slideDown('slow');
      });
      firstShow = false;
    }
  }
})();

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.alt.temp+'&deg;F</li></ul>';  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}