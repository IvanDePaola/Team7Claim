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
var myHeroes = [];//ändern
var enemyHeroes = []; //ändern
var enemyCard 
var myCard
var myHand = []

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
		switch (myCard.race) {
			case "Knights":
				switch (enemyCard.race) {
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
				switch (enemyCard.race) {
					case "Doppelgaenger":
						calculateWinner()
						break;
					default:
						myWin()
				}
				break;
			case "Dwarfs":
				switch (enemyCard.race) {
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
				switch (enemyCard.race) {
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
				switch (enemyCard.race) {
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
		switch (enemyCard.race) {
			case "Knights":
				switch (myCard.race) {
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
				switch (myCard.race) {
					case "Doppelgaenger":
						calculateWinner()
						break;
					default:
						opWin()
				}
				break;
			case "Dwarfs":
				switch (myCard.race) {
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
				switch (myCard.race) {
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
				switch (myCard.race) {
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

//TODO HTML elemente und translator
function makeMove(clickedSrc, clickedId, playable) {
		
	if (playable == "true") {

		var split = clickedId.split(".")
		removeFromHand(split[0], split[1], split[2])
		showMyPlaycard(clickedSrc, clickedId)
		myCard.setAttribute("played", 1);
		setPlayable()
		if (checkIfPlayed()) {
			calculateMove();
		}
	} else {
		if(	sessionStorage.getItem("languageBoo") == "en"){		
		alert("It's not your turn or this card is not playable'");
		} else {
			alert("Du bist nicht dran oder die Karte ist nicht spielbar");
		}
	}
}

//*******************showstuff*******************
//HTML stuff hier wird Karte angezeigt um die gespielt wird
function setWinnableCard(card) {
	document.getElementById("WinnableCard").src = createPath(card);
	document.getElementById("WinnableCard").alt = card.race + "." + card.value;
}
//HTML karte die ich spiele
function showMyPlaycard(source, id) {
	document.getElementById("playcard").src = source;
	document.getElementById("playcard").alt = id
	document.getElementById("playcard").style.visibility = "visible"

}
//HTML karte die gegener gespielt hat
function showEnemyPlaycard(card) {
	enemyPlayedcard = document.getElementById("opPlaycard");
	enemyPlayedcard.src = createPath(card);
	enemyPlayedcard.style.visibility = "visible"
	enemyPlayedcard.setAttribute("played", 1);
	enemyCard = card;
	setPlayable()
	removeFromEnemyHand(card.race, card.value)

	if (checkIfPlayed()) {
		calculateMove();
	}

}

var goblinCount;
//TODO HTML Elemente
function setHand() {
	
	opCard.style.visibility = "hidden"
	myCard.style.visibility = "hidden"
	
	var goblinCount = 0;
 	var v = 0;
  	myHand.forEach((card) => { 
	var elem = document.getElementById("card" + v)
  	elem.src = createPath(card);
  	if(card.race == "Goblin" && card.value == 0){
		elem.id = card.race + "." + card.value + "." + goblinCount
		goblinCount++
	}else{
  		elem.id = card.race + "." + card.value;
    }
    elem.style.visibility = "visible"
    if(round == 1){
		elem.addEventListener("dblclick", () => {
			makeMove(elem.src, elem.id, elem.alt )
		})
	}
	
    v++;
  	});
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

var clearCount = 0;
var clearCountOp = 0;

//generiert path zum bild anzeigen
function createPath(card) {
	return "..\\ressources\\CardPhotos\\" + card.race + card.value + ".jpg";
}

//HTML elemente Karte wird aus hand entfernt
function removeFromHand(races, values, goblin) {

	for (var i = 0; i < myHand.length; i++) {
		if (myHand[i].race == races && myHand[i].value == values) {
			sendMove(myHand[i]);
			myCard = myHand[i];
      		myHand.splice(i, 1)
      
      		if(races == "Goblin" && values == 0){
				var elem = document.getElementById( races + "." + values + "." + goblin)
			}else{
      			var elem = document.getElementById( races + "." + values)
      		}
      		elem.style.visibility = "hidden";
      		elem.id = "card" + clearCount
      		clearCount ++
      		break
    }
  }

}
//HTML element löscht eine karte vom gegner hand
function removeFromEnemyHand(races, values) {

	for (var i = 0; i < opCards.length; i++) {
		if (opCards[i].race == races && opCards[i].value == values) {
			enemyCard = opCards[i]
			opCards.splice(i, 1)

			var elem = document.getElementById("opCard" + clearCountOp)
			elem.style.visibility = "hidden";
			clearCountOp++
			if (clearCountOp == 12) {
				clearCountOp = 0
			}
			break
		}
	}

}

//HTML elemente sucht Karten die gespielt werden können der .alt wert ist true oder false je nach spielbarkeit (truecount schaut ob überhaupt eine spielbare karte vorhanden ist)
function setPlayable() {
	var trueCount = 0
	var dwarfSetter = 0
	var indicator = false;
	
	myHand.forEach((card) => {
		if (isTurn == true && myCard == null) {
			if(card.race == "Goblin" && card.value == 0){
					if(document.getElementById(card.race + "." + card.value + "." + dwarfSetter) != null){
					document.getElementById(card.race + "." + card.value + "." + dwarfSetter).alt = "true"
						trueCount++
						dwarfSetter++
						indicator = true
					}
			}else{
				document.getElementById(card.race + "." + card.value).alt = "true"
				trueCount++
				indicator = true
			}		
		} else {
			if (isTurn == true) {
				if(card.race == "Goblin" && card.value == 0){
					if(document.getElementById(card.race + "." + card.value + "." + dwarfSetter) != null){
						document.getElementById(card.race + "." + card.value + "." + dwarfSetter).alt = "false"
						trueCount++
						dwarfSetter++
					}
				}else{
					document.getElementById(card.race + "." + card.value).alt = "false"
					trueCount++
				}
			} else {
				if (enemyCard == null) {
					if(card.race == "Goblin" && card.value == 0){
						if(document.getElementById(card.race + "." + card.value + "." + dwarfSetter) != null){
							document.getElementById(card.race + "." + card.value + "." + dwarfSetter).alt = "false"
							trueCount++
							dwarfSetter++
					}
					}else{
						document.getElementById(card.race + "." + card.value).alt = "false"
						trueCount++
						}
				} else {
					if (myCard == null) {
						if (card.race == "Doppelgaenger") {
							document.getElementById(card.race + "." + card.value).alt = "true"
							trueCount++
							indicator = true
						} else {
							if (enemyCard.race == card.race) {
								if(card.race == "Goblin" && card.value == 0){
									if(document.getElementById(card.race + "." + card.value + "." + dwarfSetter) != null){
										document.getElementById(card.race + "." + card.value + "." + dwarfSetter).alt = "true"
										trueCount++
										dwarfSetter++
										indicator = true
									}
								}else{
									document.getElementById(card.race + "." + card.value).alt = "true"
									trueCount++
									indicator = true
								}
							} else {
								if(card.race == "Goblin" && card.value == 0){
									if(document.getElementById(card.race + "." + card.value + "." + dwarfSetter) != null){
										document.getElementById(card.race + "." + card.value + "." + dwarfSetter).alt = "false"
										dwarfSetter++
										indicator = true
									}
								}else{
								document.getElementById(card.race + "." + card.value).alt = "false"
								indicator = true
								}
							}
						}
					} else {
						if(card.race == "Goblin" && card.value == 0){
							if(document.getElementById(card.race + "." + card.value + "." + dwarfSetter) != null){
								document.getElementById(card.race + "." + card.value + "." + dwarfSetter).alt = "false"
								trueCount++
								dwarfSetter++
								}
						}else{
						document.getElementById(card.race + "." + card.value).alt = "false"
						trueCount++
						}
					}
				}
			}
		}
	});
	dwarfSetter = 0;
	if (trueCount == 0) {
		myHand.forEach((card) => {
			if(card.race == "Goblin" && card.value == 0){
					if(document.getElementById(card.race + "." + card.value + "." + dwarfSetter) != null){
						document.getElementById(card.race + "." + card.value + "." + dwarfSetter).alt = "true"
						dwarfSetter++
						trueCount++
						indicator = true
					}
			}else{
				document.getElementById(card.race + "." + card.value).alt = "true"
				trueCount++
				indicator = true
			}
		})
	}
	if(indicator){
		document.getElementById("mycolor").style.textShadow = "0px 0px 100px #fff, 0px 0px 100px #fff, 0px 0px 100px #fff, 0px 0px 50px #fff, 0px 0px 50px #000000, 0px 0px 50px #000000, 0px 0px 50px #000000, 0px 0px 50px #000000"
		document.getElementById("opponentColor").style.textShadow = "none"
	}else{
		document.getElementById("opponentColor").style.textShadow = "0px 0px 100px #fff, 0px 0px 100px #fff, 0px 0px 100px #fff, 0px 0px 100px #fff, 0px 0px 50px #000000, 0px 0px 50px #000000, 0px 0px 50px #000000, 0px 0px 50px #000000"
		document.getElementById("mycolor").style.textShadow = "none"
	}
	
}
//vergleicht karten wert
function calculateWinner() {
	console.log("getwin")
	if (enemyCard.value > myCard.value) {
		opWin()
	} else {
		if (enemyCard.value < myCard.value) {
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

	var split = document.getElementById("WinnableCard").alt.split(".")
	var card = { race: split[0], value: split[1] }
	if (round == 1) {
		if (enemyCard.race == "Undead") {
			enemyClaimedCards.push(enemyCard)
		}
		if (myCard.race == "Undead") {
			enemyClaimedCards.push(myCard)
		}
		enemyHeroes.push(card)
		myHeroes.push(deck.shift())
		if (rounds != 12) {
			setWinnableCard(deck.shift())
		} else {
			document.getElementById("WinnableCard").style.visibility = "hidden"
			document.getElementById("deckDown").style.visibility = "hidden"
		}
	} else {
		if (enemyCard.race != "Dwarfs") {
			enemyClaimedCards.push(enemyCard)
		} else {
			myClaimedCards.push(enemyCard)
		}
		if (myCard.race != "Dwarfs") {
			enemyClaimedCards.push(myCard)
		} else {
			myClaimedCards.push(myCard)
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
	var split = document.getElementById("WinnableCard").alt.split(".")
	var card = { race: split[0], value: split[1] }
	if (round == 1) {
		if (enemyCard.race == "Undead") {
			myClaimedCards.push(enemyCard)
		}
		if (myCard.race == "Undead") {
			myClaimedCards.push(myCard)
		}
		myHeroes.push(card)
		enemyHeroes.push(deck.shift())
		if (rounds != 12) {
			setWinnableCard(deck.shift())
		} else {
			document.getElementById("WinnableCard").style.visibility = "hidden"
			document.getElementById("deckDown").style.visibility = "hidden"
		}
	} else {
		if (enemyCard.race != "Dwarfs") {
			myClaimedCards.push(enemyCard)
		} else {
			enemyClaimedCards.push(enemyCard)
		}
		if (myCard.race != "Dwarfs") {
			myClaimedCards.push(myCard)
		} else {
			enemyClaimedCards.push(myCard)
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
	myCard = null
	enemyCard = null
	opCard.src = "#"
	opCard.style.visibility = "hidden"
	opCard.setAttribute("played", 0)
	myCard.src = "#"
	myCard.style.visibility = "hidden"
	myCard.setAttribute("played", 0)

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
		myHand = myHeroes
		opCards = enemyHeroes
	}


	dop.splice(0, dop.length)
	dwarfs.splice(0, dwarfs.length)
	goblin.splice(0, goblin.length)					
	knights.splice(0, knights.length)
	undead.splice(0, undead.length)

	myHand.forEach((card) => {
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
	
	myHand = dop.concat(dwarfs, goblin, knights, undead)
	setHand()
}

// ALLES ANPASSEN DAS NUR KOPIERT

//Chat fenster
var chatOpen = true;
const chatDiv = document.getElementById("chatdiv");

window.onload = function() {
		var language = sessionStorage.getItem("languageBoo");
	if(language == "en"){
		changeLanguageToEn();
	} else {
		changeLanguageToDe();
	}
	
	var isHost = sessionStorage.getItem("isHost");
	alert("CLAIM! :)")
}

//EVENTLISTENERs
const sendStartBTN = document.getElementById("sendstartBTN");

sendStartBTN.addEventListener("click", function(e) {
	e.preventDefault()
	sendOpThatReady(sendToUserThatReady);
})

const sendMessageBTN = document.getElementById("sendBtn");

sendMessageBTN.addEventListener("click", function(e) {
	e.preventDefault();
	//console.log(myCards)
	sendChatMessage();
	//sendC();
});

textInput.addEventListener("keypress", function(e) {
	if (e.key === "Enter") {
		sendChatMessage();
	}
});

function connect() {
	const username = sessionStorage.getItem("username");
	console.log("username: " + username);

	var socket = new SockJS("http://localhost:8080/private");
	stompClient = Stomp.over(socket);
	stompClient.connect(
		{},
		function(frame) {
			var isHost = sessionStorage.getItem("isHost");

			if (isHost == 1) {
				sendStart();
				opponent = sessionStorage.getItem("opponent");
			}
			//setConnected(true);
			console.log("Connected: " + frame);
			stompClient.subscribe("/topic/messages/" + username, function(response) {
				console.log(response);

				let data = JSON.parse(response.body);

				console.log(data);

				receiveMessage(JSON.parse(response.body));
			});
		},
		console.log("error")
	);
}

function getFirstDeckCard() {
	var firstCard = deck.shift();

	setWinnableCard(firstCard);

}

function sendC() {
	var firstCard = deck.shift();
	sendMove(firstCard);
}

function checkOpIsAlive() {
	if (!opPlayed) {
		if(	sessionStorage.getItem("languageBoo") == "en"){		
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

//Time run out

function outTime(){
	if(	sessionStorage.getItem("languageBoo") == "en"){		
		alert("You ran out of time");
		} else {
			alert("Dir ist die Zeit abgelaufen");
		}
	window.location.href = SERVERURL + "Lobbylist/lobby.html";
}








