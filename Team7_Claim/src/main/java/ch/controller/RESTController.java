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
import message.Register;

@CrossOrigin
@RestController
public class RESTController {
	@Autowired
	private JavaMailSender mailSender;
	@Autowired
	private UserDB uDB;
	
	
	//Autor Ivan De Paola
	public void sendCode(JavaMailSender emailSender ,String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("emailadresse@gmail.com");
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);
		emailSender.send(message);
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

}
