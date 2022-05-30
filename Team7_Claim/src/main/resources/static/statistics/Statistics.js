


window.onload = function() {
		var language = sessionStorage.getItem("languageBoo");
	if(language == "en"){
		changeLanguageToEn();
	} else {
		changeLanguageToDe();
	}
	
	getStats();
	
};

function retrieveUsername(){
	fetch("http://localhost:8080/retrieveusername")
		.then((response) => response.json())
		.then((data) => setUsername(data.answer))
		.then((data) => console.log("GET LOBBY: " + data));
}

function setUsername(user){
	var profile = document.getElementById("profile");
	username = user;
	profile.innerText = username;
	sessionStorage.setItem("username", username);
}

var username = "";

var statisID = document.getElementById("statisID");

statisID.addEventListener("click", function(e){
	window.location.href = "http://localhost:8080/Stats/stats.html?username=" + username;
}) 

window.onload = function getParameter() {
	let parameters = new URLSearchParams(window.location.search);
	var userParameters = parameters.get("username");
	if (userParameters != null && userParameters != undefined){
		console.log(userParameters)
		var	username = userParameters;
		getStats(username);
		} else {
			getStats("hallo");
		}
		
		var language = sessionStorage.getItem("languageBoo");
	if(language == "en"){
		changeLanguageToEn();
	} else {
		changeLanguageToDe();
	}
	}
	
var statisID = document.getElementById("statisID");

statisID.addEventListener("click", function(e){
	window.location.href = SERVERURL + "Stats/stats.html?username=" + username;
}) 

function getStats(username){
	fetch("http://localhost:8080/statistics/" + username)
		.then((response) => response.json())
		.then((data) => setWinLoss(data))
		.then(() => 	retrieveUsername())
		.then((data) => console.log("GET stats: " + data));

}

var winNumber = document.getElementById("winNumber");
var lossNumber = document.getElementById("lossNumber");
var winRateNumber = document.getElementById("winRateNumber");
var highscoreNumber = document.getElementById("highscoreNumber");

var nameSta = document.getElementById("nameStats");
var pointNumber = document.getElementById("pointNumber");

function setWinLoss(data) {
	console.log(data);
	var highScore=data.highScore;
	var win=data.win;
	var loss=data.loose;
	var games = data.playedGame;
	var userSta = data.username;
	var winRate = win*(100/games);
	var winRate2 = winRate.toFixed(2);
	pie(win,loss);
	winNumber.innerText = win;
	lossNumber.innerText = loss;
	highscoreNumber.innerText = highScore;
	winRateNumber.innerText = winRate2;
	
	pointNumber.innerText = games;
	nameSta.innerText = userSta;
}
let ctx = document.getElementById("myChart").getContext('2d');
let labels = ['Wins', 'Loss'];
let colorHex =['#EFCA08', '#FB3640'];

function pie(win, loss){
let myChart = new Chart(ctx, {
	type: 'pie',
	data: {
		datasets: [{
			data: [win, loss],
			backgroundColor: colorHex
		}],
		labels: labels
	},
})
}
