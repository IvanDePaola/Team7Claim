package ch.model;

import java.util.ArrayList;

public class Lobby {

	private ArrayList<User> players = new ArrayList<>();
	private ArrayList<String> uNames = new ArrayList<>();
	private int id;
	private String name;
	private String password;
	private boolean mode;
	public ArrayList<String> getNames() {
		return uNames;
	}
	private boolean winner;
	public Deck deck;
	public static int counter = 0;
	public final int MAX_PLAYERS = 2;
	
	//Methods
	
	public void setNames(ArrayList<String> names) {
		this.uNames = names;
	}

	public static int getCounter() {
		return counter;
	}

	public static void setCounter(int counter) {
		Lobby.counter = counter;
	}

	public int getMAX_PLAYERS() {
		return MAX_PLAYERS;
	}

	public void setDeck(Deck deck) {
		this.deck = deck;
	}
	
	//Constructors (Evtl. noch anpassen)
	
	public Lobby(String lobbyName) {
		super();
		this.id = counter++;
		this.name = lobbyName;
	}
	
	public Lobby(int id, String name) {
		
		this.id = id;
		this.name = name;
		deck = new Deck();
	}


	public Lobby(int id, String name, String password) {
		
		this.id = id;
		this.name = name;
		this.password = password;
		deck = new Deck();
	}
	
	//Getters and Setters

	public ArrayList<User> getPlayers() {
		return players;
	}

	public void setPlayers(ArrayList<User> players) {
		this.players = players;
	}

	public ArrayList<String> getuNames() {
		return uNames;
	}

	public void setuNames(ArrayList<String> uNames) {
		this.uNames = uNames;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isMode() {
		return mode;
	}

	public void setMode(boolean mode) {
		this.mode = mode;
	}

	public boolean isWinner() {
		return winner;
	}

	public void setWinner(boolean winner) {
		this.winner = winner;
	}

	public Deck getDeck() {
		return deck;
	}
	

	
	
	
}
