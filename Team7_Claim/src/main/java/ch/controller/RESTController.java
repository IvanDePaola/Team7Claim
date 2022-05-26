package ch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ch.model.User;
import ch.model.UserDB;
import message.AnsMessage;
import message.MsgChangeUname;
import message.Register;
import message.ResetPwMsg;

@CrossOrigin
@RestController
public class RESTController {
	@Autowired
	private JavaMailSender mailSender;
	@Autowired
	private UserDB uDB;
	
	
	//Autor Ivan De Paola
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

}
