package ch.model;

import java.util.ArrayList;
import java.util.Collections;
// Autor Robin Heiz
public class Deck {
	
	private ArrayList<Card> deckOfCards;
	private final int MAXCARDS = 10;
	
	
	
	
	public Deck() {
		deckOfCards = new ArrayList<Card>();
		// Zuweisung Race / Deck Mischen
		for (int z = 0; z < 5; z++) {
			switch (z) {
			
			case 1:
				for (int i = 0; i < MAXCARDS; i++) {
					Card c = new Card(Race.Undead, i);
					deckOfCards.add(c);
				}break;
			case 2:
				for (int i = 0; i < MAXCARDS; i++) {
					Card c = new Card(Race.Doppelgaenger, i);
					deckOfCards.add(c);
				}break;
			case 3:
				for (int i = 0; i < MAXCARDS; i++) {
					Card c = new Card(Race.Dwarfs, i);
					deckOfCards.add(c);
				}break;
			case 4:
				for (int i = 2; i < MAXCARDS; i++) {
					Card c = new Card(Race.Knights, i);
					deckOfCards.add(c);
				}break;
				
			case 5:
				for (int i = 0; i < MAXCARDS; i++) {
					Card c = new Card(Race.Goblin, i);
					deckOfCards.add(c);
					if(i == 0) {
						for (int t = 0; t < 4; t++) {
							Card k = new Card(Race.Goblin, 0);
							deckOfCards.add(k);
						}
					}
				}
				Collections.shuffle(deckOfCards);
			
			
			}
			
		}
		
	}



	private ArrayList<Card> getDeck() {
		return deckOfCards;
		
	}
	
}
	

