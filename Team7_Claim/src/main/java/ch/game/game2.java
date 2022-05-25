package ch.game;

import java.util.ArrayList;

import javax.websocket.Session;

import ch.model.Card;

public class game2 {
	
	String SERVERURL = "http://localhost:8000";
	
	ArrayList<Card> myCards = new ArrayList();
	ArrayList<Card> opCards = new ArrayList();
	ArrayList<Card> deck = new ArrayList();
	
	ArrayList<Card> myWonCards = new ArrayList();
	ArrayList<Card> opWonCards = new ArrayList();
	ArrayList<Card> myFollower = new ArrayList();
	ArrayList<Card> opFollower = new ArrayList();
	
	ArrayList<Card> myPlayedCard = new ArrayList();
	ArrayList<Card> opPlayedCard = new ArrayList();
	
	boolean isTurn = false;
	int round = 1;
	int rounds = 0;
	
	boolean isReady = false;
	boolean opIsReady = false;
	
	boolean played = false;
	boolean opPlayed = false;
	
	int counter = 0;
	
public void connect() {
	String username = Session.class.getName();
	console.log("username" + username);
}

public Cards distributeCards(cards, hand) {
	
}

}










