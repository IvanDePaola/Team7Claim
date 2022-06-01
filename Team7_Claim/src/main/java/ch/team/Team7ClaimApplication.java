package ch.team;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import ch.model.Lobby;
import ch.model.LobbyList;
import ch.model.User;
import ch.model.UserDB;

@SpringBootApplication
public class Team7ClaimApplication {

	public static void main(String[] args) {
		SpringApplication.run(Team7ClaimApplication.class, args);
		LobbyList.lobList = new ArrayList<Lobby>();
	}
	@Bean
	public CommandLineRunner demo(UserDB uDB) {
		return (args) -> {

			//Password hallo
			User user2 = new User("Furkan", "f.tomen@hotmail.com", "team7PWFurkan");
			User user1 = new User("Ivan", "ivand4299@gmail.com", "team7PWIvan");
			uDB.save(user1);
			uDB.save(user2);
		};

}
	
}