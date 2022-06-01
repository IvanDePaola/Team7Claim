var userName;
var statsID = document.getElementById("statsID");
statsID.addEventListener("click", function(e){
	window.location.href = SERVERURL + "Stats/stats.html?user=" + userName;
})

const password1 = document.getElementById("changeProfilePassword");

changeProfilePassword.addEventLister("click", (e) => {
	e.preventDefault();
	resetProfilePassword();
});

var pw1 = document.getElementById("changeProfilePassword");

function searchUsername(){
	fetch(SERVERURL + "searchUsername")
		.then((response) => response.json())
		.then((data) => setUser(data.answer))
		.then((data) => console.log("Username: " + userName));
}

const SERVERURL = "http://localhost:8080/";

function resetProfilePassword(){
	var isFormula = true; //TODO isFormula ändern
	var password = document.getElementById("newPassword");
	var checkPassword = document.getElementById("checkPassword");
	
	if (password.value != checkPassword.value){
			alert("Passwords don't match, please check!");
	}
	isFormula = false;

	if (password.value.length < 6) {
	alert("Password to short!")
	}
	
	if (isFormula) {
		var verificationMail = {
			email: null,
			newPw: password.value,
			userName: userName
		};
	}
	fetch(SERVERURL + "user/passwordreset", {
		method: "POST", 
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		body: JSON.stringify(verificationMail),
	})
		.then((response) =>response.json())
		.then((data) => changePasswordAlert(data.answer))
		.catch((err) => console.error(err));
	}
	
	
	
	
