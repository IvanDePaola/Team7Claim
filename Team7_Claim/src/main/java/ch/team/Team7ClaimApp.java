package ch.team;

import ch.team7.game.game;

public class Team7ClaimApp {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		//Creates our playind deck
		game deckList = new game();
		deckList.createFullDeck();
		deckList.shuffle();
		
		//creates a deck for the player
		game myCards = new game();
		
		game opCards = new game();
		
		//Karten austeilen
		for (int i = 1; i <= 10; i++) {
			myCards.draw(myCards);
		}
		
		for (int y = 1; y <= 10; y++) {
			opCards.draw(opCards);
		}
		
		
	}

}
