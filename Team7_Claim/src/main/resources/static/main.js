


//Author Robin Heiz





const SERVERURL = "http://localhost:8080/";
// name der Elemente noch hinzufügen bzw Anpassen sobald register.html fertig!!!
function register(){
	System.out.println("hoiJS");

	var mail = document.getElementById("email");
	var userName = document.getElementById("user");
	var password1 = document.getElementById("password");
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


