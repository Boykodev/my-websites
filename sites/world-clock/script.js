$(document).ready(function() {
   // set local time offset from UTC
   var localOffset = new Date().getTimezoneOffset();
   // initialize cities time offset
   var cityOffset = 0;

   preloadImages();

   setInterval( function() {
          if (cityOffset === 0) return;

          var totalOffset = localOffset - cityOffset;
          var date = new Date();
          date = addMinutes(date, totalOffset);

          var seconds = date.getSeconds();

          var mins = date.getMinutes();

          var hours = date.getHours();

          var sdegree = seconds * 6;
          var srotate = "rotate(" + sdegree + "deg)";

          var mdegree = mins * 6;
          var mrotate = "rotate(" + mdegree + "deg)";

          var hdegree = hours * 30 + (mins / 2);
          var hrotate = "rotate(" + hdegree + "deg)";

          changeClockAppearance(hours);

          $("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
          $("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});
          $("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});
       
   }, 1000 );

  // change clock appearance depending on time of the day.
  function changeClockAppearance(hours) {
    if (hours >= 18 || hours < 6) {
      if ($('#clock').hasClass('clock-day')) {
        $('#clock').addClass('clock-night').removeClass('clock-day');
        $('#min').addClass('min-night').removeClass('min-day');
        $('#hour').addClass('hour-night').removeClass('hour-day');
      }
    } else {
      if ($('#clock').hasClass('clock-night')) {
        $('#clock').addClass('clock-day').removeClass('clock-night');
        $('#min').addClass('min-day').removeClass('min-night');
        $('#hour').addClass('hour-day').removeClass('hour-night');
      }
    }
  }

   $('.cities').autocomplete({
          source: [
                 "Los Angeles",
                 "New York",
                 "London",
                 "Paris",
                 "Kyiv",
                 "Moscow",
                 "Dubai",
                 "New Delhi",
                 "Beijing",
                 "Singapore",
                 "Tokyo",
                 "Sydney",
          ], minLength: 0
   }).click(function(event) {
          $(".cities").autocomplete( "search", "" );
   });

   $('.show-time').click(function(event) {
          if ($('.cities').val() === 'Los Angeles') {
                 cityOffset = 420;
          } else if ($('.cities').val() === 'New York') {
                 cityOffset = 360;
          } else if ($('.cities').val() === 'London') {
                 cityOffset = -60;
          } else if ($('.cities').val() === 'Paris') {
                 cityOffset = -120;
          } else if ($('.cities').val() === 'Kyiv') {
                 cityOffset = -180;
          } else if ($('.cities').val() === 'Moscow') {
                 cityOffset = -180;
          } else if ($('.cities').val() === 'Dubai') {
                 cityOffset = -240;
          } else if ($('.cities').val() === 'New Delhi') {
                 cityOffset = -330;
          } else if ($('.cities').val() === 'Beijing') {
                 cityOffset = -480;
          } else if ($('.cities').val() === 'Singapore') {
                 cityOffset = -480;
          } else if ($('.cities').val() === 'Tokyo') {
                 cityOffset = -540;
          } else if ($('.cities').val() === 'Sydney') {
                 cityOffset = -600;
          } else {
                 cityOffset = 0;
          }
   });

  function preloadImages() {
    var pics = [];
    pics[0] = new Image();
    pics[1] = new Image();
    pics[2] = new Image();
    pics[0].src = 'assets/clockface-inverted.png';
    pics[1].src = 'assets/hourhand-inverted.png';
    pics[2].src = 'assets/minhand-inverted.png';
  }

   /*
    * Thanks Kip for this elegant solution on
    * http://stackoverflow.com/questions/1197928/
    */
   function addMinutes(date, minutes) {
       return new Date(date.getTime() + minutes*60000);
   }
 });