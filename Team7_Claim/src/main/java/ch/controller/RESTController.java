package ch.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ch.model.Lobby;
import ch.model.LobbyList;
import ch.model.User;
import ch.model.UserDB;
import message.AnsMessage;
import message.JoiningLobbyMsg;
import message.MsgChangeUname;
import message.OpeningLobbyMsg;
import message.Register;
import message.ResetPwMsg;
import message.StatMsg;
import message.VerifyMsg;

@CrossOrigin
@RestController
public class RESTController {
	@Autowired
	private JavaMailSender mailSender;
	@Autowired
	private UserDB uDB;
	
	
	//Autor Ivan De Paola: Source for JavaMailSender https://howtodoinjava.com/spring-core/send-email-with-spring-javamailsenderimpl-example/
	public void sendCode(JavaMailSender emailSender ,String to, String subject, String text) {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setFrom("emailadresse@gmail.com");
		msg.setTo(to);
		msg.setSubject(subject);
		msg.setText(text);
		emailSender.send(msg);
	}
	
	
	//Autor Ivan De Paola
	//Registrierung
	@PostMapping("user/register")
	public Register RegisterUser(@RequestBody Register ru) {
		if (this.uDB.findEmail(ru.geteMail()) == null && this.uDB.findUsername(ru.getUsername()) == null) {
			BCryptPasswordEncoder pe = new BCryptPasswordEncoder();
			String hashPassword = pe.encode(ru.getPassword());
			User user = new User(ru.getUsername(),hashPassword, ru.geteMail());
			//Neuer Token generieren für User Verifikation
			user.setToken(user.newToken());
			String URL = "\\http://localhost:8080/login?username=\\" + ru.getUsername() + "Your Token is: " + user.getToken() + "&execute=" + 1;
			sendCode(mailSender, ru.geteMail(), "Mailbestätigung",  URL);
			this.uDB.save(user);
			ru.setAnswer("Bestätigt");
		}else {
			ru.setAnswer("username or email taken");;
	}
		return ru;
	}
	
	//Autor Ivan De Paola
	@PostMapping("/user/sendpasswordtoken")
	public AnsMessage sendTokenForResetPassword(@RequestBody ResetPwMsg rpm) {
		User user = this.uDB.findEmail(rpm.geteMail());
		if (user != null) {
		user.setToken(user.newToken()); //Token für Verifikation	
		String URL = "\\http://localhost:8080/login?username=\\" + user.getUserName() + "&code=" + user.getToken() + "&execute=" + 2;
		sendCode(mailSender, user.getEmail(), "Token for Login", 
				"Hello" + user.getUserName() + "!" + "\n" + "Click on this link to reset your password!" + URL + "\n" + "\n" );
		return new AnsMessage("Check your emails");
		} else {
			return new AnsMessage("No user with this email");
			
		}
	}
	
	//Autor Ivan De Paola
	//Statistiken nach Spiel aktualisieren
	@PostMapping("/statistic")
	public AnsMessage setStatistics(@RequestBody StatMsg stat) {
		User winner = this.uDB.findUsername(stat.getWinner());
		User loser = this.uDB.findUsername(stat.getLoser());
		LobbyList.clear(stat.getLobName());
		winner.increaseWinner();
		winner.increaseGamesPlayed();
		loser.increaseLoser();
		loser.increaseGamesPlayed();
		this.uDB.save(winner);
		this.uDB.save(loser);
		return new AnsMessage("ok");
	}
	
	//Autor Ivan De Paola
	@GetMapping("/statistics/{username}")
	public User showStatstic(@PathVariable("username") String username) {
		User u1 = this.uDB.findUsername(username);
		System.out.println(u1);
		if(u1 != null) {
			return u1;
		}
		return null;
	}
	
	
	// Autor Robin Heiz
	@PostMapping("/user/resetpassword")
	public boolean resetPassword(@RequestBody String email) {
		
		User user = this.uDB.findEmail(email);
		boolean existingUser = false;
		if (user != null) {
			existingUser = true;
		}
		return existingUser;
	}
	// Autor Robin Heiz
	// TODO noch Anpassungen?
	@PostMapping("user/passwordreset")
	public AnsMessage resetPassword(@RequestBody ResetPwMsg rpm) {
		User user = this.uDB.findEmail(rpm.getUserName());
		
		if (user != null) {
			BCryptPasswordEncoder bcpe = new BCryptPasswordEncoder();
			String hashPassword = bcpe.encode(rpm.getNewPW());
			
			user.setPassword(hashPassword);
			this.uDB.save(user);
			return new AnsMessage("Passwort wurde geändert");
		} else {
			return new AnsMessage("Versuche es nochmal");
		}
	
	}
	
	// Autor Robin Heiz //noch anpassen?
	@PostMapping("/user/changeusename")
	public AnsMessage changeUserName(@RequestBody MsgChangeUname cm) {
		
		User user = this.uDB.findUsername(cm.getNewUserName());
		
		if (user != null) {
			return new AnsMessage("Benutzername existiert bereits");
		}
		User us = this.uDB.findUsername(cm.getUserName());
		us.setUserName(cm.getNewUserName());
		this.uDB.save(us);
		
		return new AnsMessage("Benutzername geändert");
	}
	
	// Autor Robin Heiz
	
	@PostMapping("/user/accountConfirmation")
	public AnsMessage confirmAcc(@RequestBody VerifyMsg vm) {
		User user = this.uDB.findUsername(vm.getUserName());
		
		String msg = "OK";
		
		if(user == null) {
			msg = "User";
			return new AnsMessage("Benutzer existiert nicht");
		}
		
		if(user.getToken() == vm.getCode()) {
			user.setVerifaction(true);
			
			this.uDB.save(user);
		}
		return new AnsMessage(msg);
	}
	
	
	// Autor Robin Heiz
	
	@GetMapping("/recoverUsername")
	public AnsMessage recoverU(Authentication atc) {
		return new AnsMessage(atc.getUsername());
		
	}
	
	// Autor Robin Heiz
	
	@GetMapping("/joinRandomLobby")
	public AnsMessage randomLobbyJoin() {
		AnsMessage ans = LobbyList.randoLobbyjoiner();
		return ans;
	}
	
	// Autor Robin Heiz
	
	@PostMapping("/openingLobby")
	public AnsMessage openLobby(@RequestBody OpeningLobbyMsg olm) {
		String msg;
		
		if(LobbyList.containsLobbyName(olm.getNameOfLobby())) {
			msg = "name";
		} else {
			
			Lobby newLobby = new Lobby(olm.getNameOfLobby(), olm.getUserName());
			
			LobbyList.addLobby(newLobby);
			msg = "OK";
		}
		return new AnsMessage(msg);
		
	}
	
	// Autor Robin Heiz
	@PostMapping("/joiningLobby")
	public AnsMessage joiningLobby(@RequestBody JoiningLobbyMsg jlm) {
		AnsMessage ans = LobbyList.LobbyAccess(jlm.getNameOfLobby(), jlm.getUserName());
		
		return ans;
	}
	
	// Autor Robin Heiz
	@GetMapping("/returnLobbyList")
	public ArrayList <Lobby> lobList(){
		
		for(Lobby lob : LobbyList.lobList) {
			System.out.println(lob.getNameLobby());
			
		}
		return LobbyList.lobList;
	}
	
	// Autor Robin Heiz
	@PostMapping("")
	

}
