


//Author Robin Heiz





const SERVERURL = "http://localhost:8080/";
// name der Elemente noch hinzufügen bzw Anpassen sobald register.html fertig!!!
function register(){
	System.out.println("hoiJS");

	var mail = document.getElementById("email");
	var userName = document.getElementById("user");
	var password1 = document.getElementById("password1");
	var password2 = document.getElementById("confirmPassword");
	
	console.log(userName.value);

	
	// evtl noch Anpassen
	if(userName.value == "" || userName.value == null) {
		alert("Bitte Benutzername eingeben");

	}else{	// Passwort kontrolle
		if(password1.value !== password2.value) {
			alert("Das richtige Passwort bestätigen!");

		}else{	
			if(password1.value.length < 8){
			alert("Das Passwort ist zu kurz!");

			}else{
				var message = {
    			userName: userName.value,
    			password: password1.value,
    			email: mail.valuie,
  				};
 
  				fetch(SERVERURL + "register", {
    			method: "POST",
    			headers: {
      			"Content-Type": "application/json",
      			"Access-Control-Allow-Origin": "*",
    			},
    			body: JSON.stringify(message),
  				})
    			.then((response) => response.json())
    			.then((data) => LobbyCheck(data.answer))
    			.catch((err) => console.error(err));
    
			}
		}
	}	
	
}

function LobbyCheck(data){
	if(data!== "Bestätigt"){
		alert("Email or Username already used")
	}
}


const registrationButton = document.getElementById("loginBtn");
var userName;

// registration button
registrationButton.addEventListener("click", (m) => {
	m.preventDefault();
	register();
	system.log("button")
});

//Login
const ulogin = document.getElementById("username");
const pwlogin = document.getElementById("pw");
const loginbtn = document.getElementById("loginBtn");

loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

function login() {
  sessionStorage.setItem("username", ulogin.value);
  var user = {
    username: ulogin.value,
    password: pwlogin.value,
  };

  fetch(SERVERURL + "user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => handleLogin(data.answer))
    .catch((err) => console.error(err));
}

function handleLogin(data) {
  switch (data) {
    case "NotOk":
      alert("Username or password wrong");
      break;
    case "ok":
      sessionStorage.setItem("username", ulogin.value);
      location.replace("./Game/gameHTML.html");
  }
}


