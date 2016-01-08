var totalClicks = 0;
var $clicksDisplay = $('.clicks');
var $timer = $('.wrapper');

function startClicking() {
    $('.start').hide('fast', function() {
        startAnimation();
        $clicksDisplay.show();
        $('body').click(function(event) {
            $clicksDisplay.text(++totalClicks);
        });
    });
}

function restartClicking() {
    $('.start').hide('fast', function() {
        totalClicks = 0;
        startAnimation();
        $clicksDisplay.text(totalClicks);
        $clicksDisplay.show();
    });
}

function startAnimation() {
    $timer.fadeIn('fast');
    setTimeout(stopAnimation, 30000)
    $('.spinner').add('.filler').add('.mask')
    .css('-webkit-animation-play-state', 'running')
    .css('animation-play-state', 'running');
}

function stopAnimation() {
    $('.spinner').add('.filler').add('.mask')
    .css('-webkit-animation-play-state', 'paused')
    .css('animation-play-state', 'paused');
    $timer.slideUp('slow', function() {
        showResult();
    });
}

function showResult() {
    var $start = $('.start');
    $start.children('h3').html('Your rank is:<br>' + getRank());
    $start.children('p').eq(0).text('You got ' + totalClicks + ' clicks.');
    var average = (totalClicks / 30).toFixed(2);
    $start.children('p').eq(1).text('Average is ' + average + ' clicks per second.');
    $start.children('p').eq(2).text(getRank(true));
    $start.children('button').text('RESTART');
    $start.children('button').attr('onclick', 'restartClicking()');
    $start.slideDown('slow');
}

function getRank(next) {
    if (totalClicks >= 300) {
        if (next) return 'You should be proud of your clicking skills!';
        return 'The Click Master';
    } else if (totalClicks >= 200) {
        if (next) return 'Next Rank: The Click Master, 300 clicks.';
        return 'Hardcore Clicker';
    } else if (totalClicks >= 150) {
        if (next) return 'Next Rank: Hardcore Clicker, 200 clicks.';
        return 'Experienced Clicker';
    } else if (totalClicks >= 100) {
        if (next) return 'Next Rank: Experienced Clicker, 150 clicks.';
        return 'Amateur Clicker';
    } else {
        if (next) return 'Next Rank: Amateur Clicker, 100 clicks.';
        return 'Newbie Clicker';
    }
}