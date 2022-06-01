package ch.model;

import java.util.ArrayList;

public class Lobby {

	private ArrayList<User> players = new ArrayList<>();
	private ArrayList<String> uNames = new ArrayList<>();
	private int id;
	private String nameLobby;
	public ArrayList<String> getNames() {
		return uNames;
	}
	private boolean winner;
	public Deck deck;
	public static int counter =0;
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
	
	
	
	


	public Lobby(String nameLobby, User userName) {
		
		this.id =  counter++;
		this.nameLobby = nameLobby;
		this.players.add(userName);
		deck = new Deck();
	}
	
	//Getters and Setters


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

	public String getNameLobby() {
		return nameLobby;
	}

	public void setNameLobby(String name) {
		this.nameLobby = name;
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
