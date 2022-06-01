package ch.model;

import java.util.Random;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


//Autor: Ivan De Paola
@Entity
@Table(name = "usertable")
public class User {
	
	@Id
	@GeneratedValue (strategy = GenerationType.AUTO)
	private Long id;
	private String userName;
	private String email;
	private String password;
	private boolean verifaction;
	private int winner;
	private int loser;
	private int gamesPlayed;
	private int score;
	private int token;
	
	
	//Getters and setters
	
	
	
	public Long getId() {
		return id;
	}
	public int getToken() {
		return token;
	}
	public void setToken(int token) {
		this.token = token;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isVerifaction() {
		return verifaction;
	}
	public void setVerifaction(boolean verifaction) {
		this.verifaction = verifaction;
	}
	public int getWinner() {
		return winner;
	}
	public void setWinner(int winner) {
		this.winner = winner;
	}
	public int getLoser() {
		return loser;
	}
	public void setLoser(int loser) {
		this.loser = loser;
	}
	public int getGamesPlayed() {
		return gamesPlayed;
	}
	public void setGamesPlayed(int gamesPlayed) {
		this.gamesPlayed = gamesPlayed;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	
	// methods
	
	public void increaseWinner() {
		this.winner++;
		this.score += 10;
	}
	
	public void increaseLoser() {
		this.loser++;
	}
	
	public void increaseGamesPlayed() {
		this.gamesPlayed++;
	}
	
	public int newToken() {
		Random rdm = new Random();
		Integer secr = rdm.nextInt(999999) + 100000;
		return secr;
	}	
	
	// constructor
	public User(String userName, String email, String password) {
		super();
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.verifaction = false;
		this.winner = 0;
		this.loser = 0;
		this.gamesPlayed = 0;
		this.score = 0;
	}
	
	
	
	
	
	

}
