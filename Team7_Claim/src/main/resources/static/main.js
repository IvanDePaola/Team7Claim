


//Author Robin Heiz





const SERVERLINK = "http://localhost:8080/";
// name der Elemente noch hinzufügen bzw Anpassen sobald register.html fertig!!!
function registration(){
	var mail = document.getElementById("mail");
	var userName = document.getElementById("user");
	var password1 = document.getElementById("password");
	var password2 = document.getElementById("confirmPassword");
	
	console.log(userName.value);
	
	var isForm = true;
	
	// evtl noch Anpassen
	if(userName.value == "" || userName.value == null) {
		alert("Bitte Benutzername eingeben");
		
		isForm = false;
	}
	// Passwort kontrolle
	if(password1.value !== password2.value) {
		alert("Das richtige Passwort bestätigen!");
		
		isForm = false;
	}
	if(password1.value.length < 8){
		alert("Das Passwort ist zu kurz!");
		
		isForm = false;
	}
	
	
}


const registrationButton = document.getElementById("loginBtn");
var userName;

// registration button
registrationButton.addEventListener("click", (m) => {
	m.preventDefault();
	register();
});