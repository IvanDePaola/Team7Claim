//@Author Furkan

const SERVERURL = "http://localhost:8080/";
var opponent = sessionStorage.getItem("opponent");

var eCards = []; 
var gCards = [];
var deck = [];
var myTurn 
var round = 0 
var phase = 1


var myClaimedCards = [];
var enemyClaimedCards = [];
var myHeroes = [];
var enemyHeroes = []; 
var enemyCardPlayed 
var myCardPlayed
var myHand = []
var winableCard

var stompClient = null;
var sessionId = "";

//distributeCards
function gameStart(cards){
	var counter;
	cards.forEach((card) => {
		if (myTurn) {
			if(counter <13) {
				eCards.push(card)
			}else{
				if(counter > 25) {
					deck.push(card)
				}
			}	
		}else{
			if (counter < 25) {
			eCards.push(card)
			}else{
				deck.push(card)
			}
		}	
	});
	
}
 
//**********************GAMEPLAY STUFF **************************/
//calculateMove
function calculateMove(){

	await sleep(2000);

	if (myTurn) {
		switch (myCardPlayed.race) {
			case "Knights":
				switch (enemyCardPlayed.race) {
					case "Knights":
						calculateWinner()
						break;
					case "Doppelgaenger":
						calculateWinner()
						break;
					default:
						myWin()
				}
				break;
			case "Doppelgaenger":
				switch (enemyCardPlayed.race) {
					case "Doppelgaenger":
						calculateWinner()
						break;
					default:
						myWin()
				}
				break;
			case "Dwarfs":
				switch (enemyCardPlayed.race) {
					case "Dwarfs":
						calculateWinner()
						break;
					case "Doppelgaenger":
						calculateWinner()
						break;
					default:
						myWin()
				}
				break;
			case "Goblin":
				switch (enemyCardPlayed.race) {
					case "Knights":
						opWin()
						break;
					case "Goblin":
						calculateWinner()
						break;
					case "Doppelgaenger":
						calculateWinner()
						break;
					default:
						myWin()
				}
				break;
			case "Undead":
				switch (enemyCardPlayed.race) {
					case "Undead":
						calculateWinner()
						break;
					case "Doppelgaenger":
						calculateWinner()
						break;
					default:
						myWin()
				}
		}
	} else {
		switch (enemyCardPlayed.race) {
			case "Knights":
				switch (myCardPlayed.race) {
					case "Knights":
						calculateWinner()
						break;
					case "Doppelgaenger":
						calculateWinner()
						break;
					default:
						opWin()
				}
				break;
			case "Doppelgaenger":
				switch (myCardPlayed.race) {
					case "Doppelgaenger":
						calculateWinner()
						break;
					default:
						opWin()
				}
				break;
			case "Dwarfs":
				switch (myCardPlayed.race) {
					case "Doppelgaenger":
						calculateWinner()
						break
					case "Dwarfs":
						calculateWinner()
						break
					default:
						opWin()
				}
				break;
			case "Goblin":
				switch (myCardPlayed.race) {
					case "Knights":
						myWin()
						break
					case "Goblin":
						calculateWinner()
						break
					case "Doppelgaenger":
						calculateWinner()
						break
					default:
						opWin()
				}
				break;
			case "Undead":
				switch (myCardPlayed.race) {
					case "Undead":
						calculateWinner()
						break
					case "Doppelgaenger":
						calculateWinner()
						break
					default:
						opWin()
				}

		}
	}
	if (round == 13 && round == 1) {
		phase = 2
		sortHand(setHand)
		setOpHand()

	}

	if (round == 26 && round == 2) {
		whoWon();
	}
	showScore()

}
// Lobby löschen/ Autor Robin Heiz
function closeLobby(){
		var msg = {
		lobbyName: lobbyName,
	}
		fetch(SERVERURL + "closeLobby", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(msg),
	})
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((err) => console.error(err));
}

//TODO HTML elemente und translator
function makeMove(clickedSrc, position, playable) {
		
	if (playable == "true") {
		removeFromHand(position)
		showMyPlaycard(clickedSrc)
		myCardPlayed = handList[position]
		setPlayable()
		if (checkIfPlayed()) {
			calculateMove();
		}
	}
}

//*******************showstuff*******************
//HTML stuff hier wird Karte angezeigt um die gespielt wird
function setWinnableCard(card) {
	document.getElementById("WinnableCard").src = createPath(card);
	winableCard = card
}
//HTML karte die ich spiele
function showMyPlaycard(source) {
	document.getElementById("playcard").src = source;
	document.getElementById("playcard").style.visibility = "visible"

}
//HTML karte die gegener gespielt hat
function showEnemyPlaycard(card) {
	enemyP = document.getElementById("enemyPlaycard");
	enemyP.src = createPath(card);
	enemyP.style.visibility = "visible"
	enemyCardPlayed = card;	

	setPlayable()
	removeFromEnemyHand()

	if (myCardPlayed != null && enemyCardPlayed != null) {
		calculateMove();
	}

}

var handList = []


function fillHandList(cards){
	cards.forEach((card) => {
		handList.push(card)
	});
}

function showHandList(){
	for(var i = 0; i<15; i++){
		handCard = document.getElementById("handCard" + i)
		if(handList[i] != null){
			handCard.src = createPath(handList[i])
			handCard.race = card.race
			handCard.value = card.value
		}else{
			handCard.style.visibility = "hidden"
			handCard.race = null
			handCard.value = null
		}
	}
	setPlayable()
}
  	
  	
// hier wird die opHand angezeigt (13x rückseite von karte)
function setOpHand() {
	for (var v = 0; v < 13; v++) {
		document.getElementById("opCard" + v).style.visibility = "visible";
	}
}

var myScore, opScore

//HTML elemente Score werden mit den Zahlen gefült
function showScore() {

	myKnights = countMeHard(myClaimedCards, "Knights")
	myDwarfs = countMeHard(myClaimedCards, "Dwarfs")
	myGoblin = countMeHard(myClaimedCards, "Goblin")
	myDoppelgaenger = countMeHard(myClaimedCards, "Doppelgaenger")
	myUndead = countMeHard(myClaimedCards, "Undead")
	
	opKnights = countMeHard(enemyClaimedCards, "Knights")
	opDwarfs = countMeHard(enemyClaimedCards, "Dwarfs")
	opGoblin = countMeHard(enemyClaimedCards, "Goblin")
	opDoppelgaenger = countMeHard(enemyClaimedCards, "Doppelgaenger")
	opUndead = countMeHard(enemyClaimedCards, "Undead")

	document.getElementById("myDoppelgaengerNr").innerHTML = myDoppelgaenger
	document.getElementById("myDwarfsNr").innerHTML = myDwarfs
	document.getElementById("myGoblinsNr").innerHTML = myGoblin
	document.getElementById("myKnightsNr").innerHTML = myKnights
	document.getElementById("myUndeadNr").innerHTML = myUndead
	
	document.getElementById("opDoppelgaengerNr").innerHTML = opDoppelgaenger
	document.getElementById("opDwarfsNr").innerHTML = opDwarfs
	document.getElementById("opGoblinsNr").innerHTML = opGoblin
	document.getElementById("opKnightsNr").innerHTML = opKnights
	document.getElementById("opUndeadNr").innerHTML = opUndead
	
}

//*****************Helpers*******************

var clearCountOp = 0;

//generiert path zum bild anzeigen
function createPath(card) {
	return "..\\ressources\\CardPhotos\\" + card.race + card.value + ".jpg";
}

//HTML elemente Karte wird aus hand entfernt
function removeFromHand(position) {
	handList[position] = null
	document.getElementById("handCard" +position).style.visibility = "hidden"

}
//HTML element löscht eine karte vom gegner hand
function removeFromEnemyHand() {

			var elem = document.getElementById("opCard" + clearCountOp)
			elem.style.visibility = "hidden";
			clearCountOp++
			if (clearCountOp == 12) {
				clearCountOp = 0
			}
		
	}

//HTML elemente sucht Karten die gespielt werden können der .alt wert ist true oder false je nach spielbarkeit (truecount schaut ob überhaupt eine spielbare karte vorhanden ist)
function setPlayable() {
	var trueCount = 0
	
	for (var i = 0; i< handList.length; i++){
		if(card != null){
			if (isTurn == true && myCardPlayed == null) {
				trueCount++
				document.getElementById("handCard" + i).alt = "true"
			}	
		} else {
			if (isTurn == true) {
					document.getElementById("handCard" + i).alt = "false"				
			} else {
				if (enemyCardPlayed == null) {
					document.getElementById("handCard" +i).alt = "false"
	
				} else {
					if (myCardPlayed == null) {
						if (handList[i].race == "Doppelgaenger") {
							document.getElementById("handCard" + i).alt = "true"
							trueCount++
						} else {
							if (enemyCardPlayed.race == handList[i].race) {
								document.getElementById("handCard" + i).alt = "true"
								trueCount++		
							}else{
								document.getElementById("handCard" + i).alt = "true"
								}

						}
					}
				}
			}
		}
	}

	if (trueCount == 0) {
		for(var i= 0; i < handList.length; i++){
			if(handList[i] != null){
			document.getElementById("HandCard" + i).alt = "true"
			}
		}
	}
	trueCount = 0

	
}
//vergleicht karten wert
function calculateWinner() {
	console.log("getwin")
	if (enemyCardPlayed.value > myCardPlayed.value) {
		opWin()
	} else {
		if (enemyCardPlayed.value < myCardPlayed.value) {
			myWin()
		} else {
			if (isTurn) {
				myWin()
			} else {
				opWin()
			}
		}
	}
}
//HTML elemente
function opWin() {

	var card = winableCard
	if (round == 1) {
		if (enemyCardPlayed.race == "Undead") {
			enemyClaimedCards.push(enemyCardPlayed)
		}
		if (myCardPlayed.race == "Undead") {
			enemyClaimedCards.push(myCardPlayed)
		}
		enemyHeroes.push(card)
		myHeroes.push(deck.shift())
		if (rounds != 12) {
			setWinnableCard(deck.shift())
		} else {
			document.getElementById("WinnableCard").style.visibility = "hidden"
			document.getElementById("deckBack").style.visibility = "hidden"
		}
	} else {
		if (enemyCardPlayed.race != "Dwarfs") {
			enemyClaimedCards.push(enemyCardPlayed)
		} else {
			myClaimedCards.push(enemyCardPlayed)
		}
		if (myCardPlayed.race != "Dwarfs") {
			enemyClaimedCards.push(myCardPlayed)
		} else {
			myClaimedCards.push(myCardPlayed)
		}
	}
	console.log("opWon")
	rounds++
	isTurn = false
	deletePlayedCard()
	setPlayable()

}
//HTML elemente
function myWin() {
	console.log("iWon")
	var card = winableCard
	if (round == 1) {
		if (enemyCardPlayed.race == "Undead") {
			myClaimedCards.push(enemyCardPlayed)
		}
		if (myCardPlayed.race == "Undead") {
			myClaimedCards.push(myCardPlayed)
		}
		myHeroes.push(card)
		enemyHeroes.push(deck.shift())
		if (rounds != 12) {
			setWinnableCard(deck.shift())
		} else {
			document.getElementById("WinnableCard").style.visibility = "hidden"
			document.getElementById("deckBack").style.visibility = "hidden"
		}
	} else {
		if (enemyCardPlayed.race != "Dwarfs") {
			myClaimedCards.push(enemyCardPlayed)
		} else {
			enemyClaimedCards.push(enemyCardPlayed)
		}
		if (myCardPlayed.race != "Dwarfs") {
			myClaimedCards.push(myCardPlayed)
		} else {
			enemyClaimedCards.push(myCardPlayed)
		}
	}
	rounds++
	isTurn = true
	deletePlayedCard()
	setPlayable()

}
//zählt anzahl gleicher races in einem array
function countMeHard(array, races) {
	var count = 0
	array.forEach((card) => {
		if (card.race == races) {
			count++
		}
	})
	return count
}

function whoWon() {
	var myWin = 0
	var opWin = 0
	var races = ["Knights", "Goblin", "Dwarfs", "Undead", "Doppelgaenger"]
	for (var i = 0; i < races.length; i++) {
		switch (compareN(countMeHard(myClaimedCards, races[i]), countMeHard(enemyClaimedCards, races[i]), races[i])) {
			case -1:
				opWin++
				break
			case 1:
				myWin++
				break
		}
	}
	if (myWin < opWin) {
		clearInterval(playingTimer)
		window.location.href = SERVERURL + "Lobbylist/lobby.html";
		return "Lose"
	} else {	
		clearInterval(playingTimer)
		sendStatistics();
		return "Win"
	}

}

//schaut wer mehr karten einer rasse besitzt (für endresultat)
function compareN(n1, n2, race) {
	var me = 0
	var op = 0

	if (n1 < n2) {
		return -1
	} else {
		if (n1 > n2) {
			return 1
		} else {
			myClaimedCards.forEach((card) => {
				if (card.race == race) {
					if (me < card.value) {
						me = card.value
					}
				}
			})
			enemyClaimedCards.forEach((card) => {
				if (card.race == race) {
					if (op < card.value) {
						op = card.value
					}
				}
			})
			if (op < me) {
				return 1
			} else {
				return -1
			}
		}
	}

}
//HTML elemente gespielte karten werden gelöscht
function deletePlayedCard() {
	myCardPlayed = null
	enemyCardPlayed = null
	opC = document.getElementById("opPlayedCard").src = "#"
	opC.style.visibility = "hidden"
	myC = document.getElementById("myPlayedCard").src = "#"
	myCardPlayed.style.visibility = "hidden"

}
//HTML elemente Handkarten werden (sollten) sortiert werden
//https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

var dop = []
var dwarfs = []
var goblin = []
var knights = []
var undead = []

function sortHand(){

	if(round == 2){
		handList = myHeroes
	}


	dop.splice(0, dop.length)
	dwarfs.splice(0, dwarfs.length)
	goblin.splice(0, goblin.length)					
	knights.splice(0, knights.length)
	undead.splice(0, undead.length)

	handList.forEach((card) => {
		switch(card.race){
			case "Doppelgaenger":
				dop.push(card)
				break;
			case "Dwarfs":
				dwarfs.push(card)
				break;
			case "Goblin":
				goblin.push(card)
				break;
			case "Knights":
				knights.push(card)
				break;
			case "Undead":
				undead.push(card)
				
		}	
	})

	dop.sort(function(a, b){return a.value - b.value});
	dwarfs.sort(function(a, b){return a.value - b.value});
	goblin.sort(function(a, b){return a.value - b.value});
	knights.sort(function(a, b){return a.value - b.value});
	undead.sort(function(a, b){return a.value - b.value});
	
	handList = dop.concat(dwarfs, goblin, knights, undead)
	showHandList()
}


// noch anpassen!

var color;
var myColor = document.getElementById("mycolor");
var enemyColor = document.getElementById("enemyColor");

var containerModal = document.getElementById("container");
var prepDIV = document.getElementById("prepDIV");
var waitForEnemy = document.getElementById("waitForEnemy");
var prepareH = document.getElementById("prepareH");

const userName = sessionStorage.getItem("userName");
const lobbyName = sessionStorage.getItem("lobbyname");


const chatBlock = document.getElementById("chat");
const textInput = document.getElementById("text");

//Chat fenster
//TODO Brauchen wir das weil wir keine zusätzlichen sprachen haben?
var chatOpen = true;
const chatContainer = document.getElementById("chatContainer");

window.onload = function() {
		var language = sessionStorage.getItem("language1");
	
	var isHost = sessionStorage.getItem("isHost");
	alert("CLAIM! :)")
}

//EVENTLISTENERs
const setStartButton = document.getElementById("setStartButton");

setStartButton.addEventListener("click", function(e) {
	e.preventDefault()
	sendOpThatReady(sendToUserThatReady);
})

const setMessageButton = document.getElementById("sendButton");

setMessageButton.addEventListener("click", function(e) {
	e.preventDefault();
	sendChatMessage();
	//sendCards();
});

textInput.addEventListener("keypress", function(e) {
	if (e.key === "Enter") {
		sendChatMessage();
	}
});

function connect() {
	const userName = sessionStorage.getItem("userName");
	console.log("userName: " + userName);

	var socket = new SockJS("http://localhost:8080/private");
	socketClient = Stomp.over(socket);
	socketClient.connect(
		{},
		function(frame) {
			var isHost = sessionStorage.getItem("isHost");

			if (isHost == 1) {
				sendStart();
				opponent = sessionStorage.getItem("opponent");
			}
			//setConnected(true);
			console.log("Connected: " + frame);
			socketClient.subscribe("/topic/messages/" + userName, function(response) {
				console.log(response);

				let data = JSON.parse(response.body);

				console.log(data);

				receiveMessage(JSON.parse(response.body));
			});
		},
		console.log("error")
	);
}
//MOVES
function getFirstDeckCard() {
	var firstCard = deck.shift();

	setWinnableCard(firstCard);

}

function sendCards() {
	var firstCard = deck.shift();
	sendMove(firstCard);
}

function checkOpIsAlive() {
	if (!opPlayed) {
		if(	sessionStorage.getItem("language1") == "en"){		
		alert("Opponent ran out of time");
		} else {
			alert("Dem Gegner ist die Zeit abgelaufen");
		}
		sendOpTimeIsOut();
		sendStatistics();
	}
}

//chat functions
function chatDivOpener() {

	chatOpen = !chatOpen;
	if (!chatOpen) {
		chatDiv.style.transform = "translateX(-90%)"
	} else {
		chatDiv.style.transform = "translateX(0%)"
	}
}

//Time run out // ANPASSEN!!!

function outTime(){
	if(	sessionStorage.getItem("language1") == "en"){		
		alert("You ran out of time");
		} else {
			alert("Dir ist die Zeit abgelaufen");
		}
	window.location.href = SERVERURL + "Lobbylist/lobby.html";
}
function getCards() {
	var lobbyName = sessionStorage.getItem("lobbyname");
	fetch(SERVERURL + "getPlayCards/" + lName, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
	})
		.then((response) => response.json())
		.then((data) => gameStart(data))
		.catch((err) => console.error(err));
}








