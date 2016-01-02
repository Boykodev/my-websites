var currentLetter = 0;
var circles = document.getElementById("letters").getElementsByTagName("li");

function setColors() {
	circles[0].style.background = "aquamarine";
	circles[1].style.background = "darkcyan";
	circles[2].style.background = "gold";
	circles[3].style.background = "orange ";
	circles[4].style.background = "orangered";
	circles[5].style.background = "red";
	circles[6].style.background = "green";
	circles[7].style.background = "blue";
	circles[8].style.background = "yellow";
	circles[9].style.background = "#ec528d";
}

function makeAnimation() {
	if (currentLetter < 10) {
		circles[currentLetter].style.WebkitAnimationPlayState = "running";
		circles[currentLetter].style.animationPlayState = "running";
		currentLetter++;
	}
}