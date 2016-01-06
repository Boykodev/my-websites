var frameContents;
$(document).ready(function() {
	frameContents = $('#frame').contents();
	showPlanets();
});

function showHelp() { $('#info').slideDown('fast'); }
function hideHelp() { $('#info').slideUp('fast'); }

function showPlanets() {
	var frame = $('#frame');
	var body = frame.contents().find('body');
	body.css('margin', '0px');
	var planets =
	'<img src="assets/planets.jpg" width="850" height="670" alt="Planets" usemap="#planetmap">\
	<map name="planetmap">\
	  <area shape="circle" coords="360, 345, 150" alt="Sun" href="https://en.wikipedia.org/wiki/Sun" target="frame">\
	  <area shape="circle" coords="116, 344, 50" alt="Mercury" href="https://en.wikipedia.org/wiki/Mercury_(planet)" target="frame">\
	  <area shape="circle" coords="162, 491, 30" alt="Venus" href="https://en.wikipedia.org/wiki/Venus"  target="frame">\
	  <area shape="circle" coords="152, 180, 52" alt="Earth" href="https://en.wikipedia.org/wiki/Earth"  target="frame">\
	  <area shape="circle" coords="300, 98, 44" alt="Mars" href="https://en.wikipedia.org/wiki/Mars"  target="frame">\
	  <area shape="circle" coords="541, 115, 90" alt="Jupiter" href="https://en.wikipedia.org/wiki/Jupiter"  target="frame">\
	  <area shape="circle" coords="698, 245, 78" alt="Saturn" href="https://en.wikipedia.org/wiki/Saturn"  target="frame">\
	  <area shape="circle" coords="698, 490, 58" alt="Uranus" href="https://en.wikipedia.org/wiki/Uranus"  target="frame">\
	  <area shape="circle" coords="479, 595, 58" alt="Neptune" href="https://en.wikipedia.org/wiki/Neptune"  target="frame">\
	  <area shape="circle" coords="279, 594, 18" alt="Pluto" href="https://en.wikipedia.org/wiki/Pluto"  target="frame">\
	</map>';
	body.append(planets);
}

function goBack() {
	$('#frame').remove();
	$('#back').before('<iframe id="frame" name="frame"></iframe>');
	showPlanets();
}