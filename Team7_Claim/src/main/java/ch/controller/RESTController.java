package ch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class RESTController {
	@Autowired
	private JavaMailSender mailSender;
	@Autowired
	private UserRepository userRepository;
	
	
	public RegisterUser

}
