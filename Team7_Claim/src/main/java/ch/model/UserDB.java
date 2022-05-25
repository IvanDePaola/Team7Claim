package ch.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDB extends JpaRepository <User, Long> {
	
	User findUsername(String username);
	User findEmail(String email);

}
