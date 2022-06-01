

window.onload = function () {
  returnLobbyList();
};

//Lobby vom Server abrufen
function returnLobbyList() {
  fetch(SERVERURL + "returnLobbyList")
    .then((response) => response.json())
    .then((data) => createLobbyList(data))
    .then((data) => console.log("GET LOBBY: " + data));
}

//Liste mit Verfügbaren Lobbies erstellen
function createLobbyList(lobbyList) {
  for (var i = 0; i < lobbyList.length; i++) {
   
    var x = lobbyList[i];
    console.log(lobbyList[i].name);
    var table = document.getElementById("lobbytble");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
 

    cell1.innerHTML = x.name;
    cell2.innerHTML = x.names[0];


    var var1 = document.createElement("BUTTON");
    var1.setAttribute("lobname", x.name);
    var1.innerHTML = "Join";
    cell4.append(var1);
    var1.addEventListener("click", function (event) {
      console.log(event);
      enterLobby(event.target.getAttribute("lobname"));
    });
  }
}

//Bestehende Lobby suchen und joinen 
var username = document.getElementById("username");
var lobby = document.getElementById("lobby");

var joinButton = document.getElementById("join");

joinButton.addEventListener("click", (e) => {
  e.preventDefault();
  enterLobby(lobby);
});

//Lobby erstellen
var lobbyinput = document.getElementById("lobbyname");
const createLobbyButton = document.getElementById("createlobby");

createLobbyButton.addEventListener("click", function (e) {
  e.preventDefault();
  createLobby();
});


const SERVERURL = "http://localhost:8080/";


function createLob() {
  var uname = document.getElementById("username");
  var message = {
    lobbyname: lobbyinput.value,
    username: uname.value,
  };
 
  sessionStorage.setItem("username", uname.value);

  console.log(lobbyinput.value);
  fetch(SERVERURL + "createlobby", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(message),
  })
    .then((response) => response.json())
    .then((data) => LobbyAnsCheck(data.answer))
    .catch((err) => console.error(err));
}


//Antwort vom Server
function LobbyAnsCheck(response) {
  switch (response) {
    case "ok":
      var lobname = document.getElementById("lobybname");
      sessionStorage.setItem("lobbyname", lobname.value);
      sessionStorage.setItem("isHost", 0);
      backToGame();

      break;
    case "name":
      alert("lobby name exists already");
      break;
  }
}

function backToGame() {
  location.replace("../Game/index.html");
}




function enterLobby(lobname) {
  var message = {
    lobbyname: lobname,
    username: username.value,
  };

  sessionStorage.setItem("username", username.value);
  fetch(SERVERURL + "enterLobby", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(message),
  })
    .then((response) => response.json())
    .then((data) => checkResponse(data))
    .catch((err) => console.error(err));
}

//Testen ob Lobby voll ist
function checkResponse(response) {
  console.log("response: " + response.opponent);
  console.log("res: " + response);
  if (response.answer === "ok") {
    sessionStorage.setItem("opponent", response.opponent);
    sessionStorage.setItem("isHost", 1);
    backToGame();
  } else {
    alert("Lobby is already full");
  }
}

