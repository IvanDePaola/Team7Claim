function startFunction() {
	const user = sessionStorage.getItem("username");
	const enemy = sessionStorage.getItem("rival");


	stompClient.send(
		"/app/chat",
		{},
		JSON.stringify({
			from: user,
			to: enemy,
			content: user,
			type: "start",
		})
	);
}

function startGame() {
	const user = sessionStorage.getItem("username");
	isReady = true;
	stompClient.send(
		"/app/chat",
		{},
		JSON.stringify({
			from: user,
			to: rival,
			content: user,
			type: "startGame",
			color: color
		})
	);
}

function chatMessanger() {
	var text = document.getElementById("text").value;
	var div = document.createElement("div");
	var chatMessage = document.createElement("P");
	chatMessage.className = "myMessage";
	chatMessage.innerHTML = text;
	div.append(chatMessage);
	chatBlock.append(div);
	document.getElementById("text").value = "";
	stompClient.send(
		"/app/chat",
		{},
		JSON.stringify({
			from: username,
			to: rival,
			content: text,
			type: "chat",
		})
	);
}

function sendMove(card) {
	clearInterval(playingTimer);
	playingTimer = setInterval(checkOpIsAlive, 60000);
	enemyMove = false;

	stompClient.send(
		"/app/chat",
		{},
		JSON.stringify({
			from: username,
			to: rival,
			content: "move",
			type: "move",
			card: card,
		})
	);
}

function confirmation() {
	var type = "confirmGame";
	stompClient.send(
		"/app/chat",
		{},
		JSON.stringify({
			from: username,
			to: rival,
			type: type,
		})
	);
}

function timeOutEnemy() {
	stompClient.send(
		"/app/chat",
		{},
		JSON.stringify({
			from: username,
			to: rival,
			content: username,
			type: "time",
		})
	);
}
//HABEN WIR
function sendStats(){

	var message = {
		wonPlayer : username,
		lostPlayer: rival,
		lobbyName: lobbyName,
	}
	
	fetch(SERVERURL + "statistic", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	})
		.then((response) => response.json())
		.then((data) => leadToLobbyList(data))
		.catch((err) => console.error(err));
}

function leadToLobbyList(data){
	if(	sessionStorage.getItem("languageBoo") == "en"){		
		alert("You won");
		} else {
			alert("Du hast gewonnen");
		}
	window.location.href = SERVERURL + "Lobbylist/lobby.html";
}

var return1 = document.getElementById("return1");

return1.addEventListener("click", function(e){
	e.preventDefault();
	closeRoom();
})

var leaveLobby = document.getElementById("leaveLobby");

leaveLobby.addEventListener("click", function(e){
	e.preventDefault();
	window.location.href = SERVERURL + "Lobbylist/lobby.html";
})

/*function closeRoom(){
		var message = {
		lobbyName: lobbyName,
	}
		fetch(SERVERURL + "deletelobby", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	})
		.then((response) => response.json())
		.then((data) => closeRoomHandler(data))
		.catch((err) => console.error(err));
}*/

/*function closeRoomHandler(data){
	if(data.answer =="ok"){
		window.location.href=SERVERURL + "Lobbylist/lobby.html"
	}
}*/
//HABEN WIR
//RECEIVE METHODS
function receiveMessage(message) {
	switch (message.type) {
		case "start":
			rival = message.content;
			setChatHeader();
			changeModal();
			break;
		case "move":
			clearInterval(playingTimer)
			enemyMove = true;
			setOpPlaycard(message.card)
			break;
		case "chat":
			receiveChat(message);
			break;
		case "cards":
			getCard();
			break;
		case "startGame":
			if (opIsReady == false){
				opIsReady = true;
				recreiveStartGame(message)
			}//sendOpThatReady();
			break;
		case "confirmGame":
			hideModal();
			break;
		case "time":
			outTime();
			break;
		case "giveup":
			sendStats();
			break;
	}
}

function recreiveStartGame(message) {
	enemyColor.style.color = message.color;
	if (isReady === false) {
		
		changeModal();
	} else {
		
		hideModal();
		confirmation();
	}
}


function receiveChat(message) {
	var div = document.createElement("div");
	var chatMessage = document.createElement("P");
	chatMessage.innerHTML = message.content;
	chatMessage.className = "enemyMessage";
	div.append(chatMessage);
	chatBlock.append(div);
}

function setChatHeader() {
	/*var chatH = document.getElementById("chatheader"); opHeader
	var enemy = document.createElement("H1");
	enemy.innerText = rival;
	chatH.appendChild(enemy);*/
	var chatH = document.getElementById("chatheader"); 
	var opHeader = document.getElementById("opHeader"); 
	opHeader.innerText = rival;
	
}

function checkToCompare() {

	var enemyMove = opCard.getAttribute("played")
	var myMove = myCard.getAttribute("played")


	if (myMove == 1 && enemyMove == 1) {

		return true;
	}
	return false;
}

function checkIsReady() {
	if (!opIsReady) {
		if(	sessionStorage.getItem("languageBoo") == "en"){		
		alert("Opponent ran out of time");
		} else {
			alert("Dem Gegner ist die Zeit abgelaufen");
		}
		timeOutEnemy();
		closeRoom();
	} else {
		clearInterval(timer);
	}
}

function changeModal() {
	containerModal.style.zIndex = 11;
	containerModal.style.opacity = 1;
	waitForEnemy.style.zIndex = -1;
	waitForEnemy.style.opacity = 0;
}

function hideModal() {
	var return1 = document.getElementById("return1");
	var leaveLobby = document.getElementById("leaveLobby");
	prepareDiv.style.zIndex = -1;
	prepareDiv.style.opacity = 0;
	containerModal.style.zIndex = -1;
	containerModal.style.opacity = 0;
	waitForEnemy.style.zIndex = -1;
	waitForEnemy.style.opacity = 0;
	return1.style.zIndex =-1;
	leaveLobby.style.zIndex =-1;
	
}
var openChat = document.getElementById("openChat");

openChat.addEventListener("click", function() {
	chatDivOpener();
})

