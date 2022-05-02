package main.java.ch.team;

import main.java.ch.game.Game;

public class Team7ClaimApp {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		//Creates our playing deck
		Game deckList = new Game();
		deckList.createFullDeck();
		deckList.shuffle();
		
		//creates a deck for the player
		Game myCards = new Game();
		
		Game opCards = new Game();
		
		//Karten austeilen
		for (int i = 1; i <= 10; i++) {
			myCards.draw(myCards);
		}
		
		for (int y = 1; y <= 10; y++) {
			opCards.draw(opCards);
		}
		
		//Starter Karte
		deckList.draw(deckList);
		
		
	}

}
