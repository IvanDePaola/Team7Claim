/*package ch.game;

import java.awt.Font;
import java.util.ArrayList;
import java.util.Random;

import javax.swing.JLabel;
import javax.swing.JOptionPane;

import ch.model.Card;

public class game {

	private ArrayList<Card> deckList;
	private ArrayList<Card> myCards;
	private ArrayList<Card> opCards;
	
	// BITTE AB HIE @ANDREA DANKE DIR
	public void shuffle() {
		ArrayList<Card>tempDeck = new ArrayList<Card>();
		Random random = new Random();
		int randomCardIndex = 0;
		int originalSize = this.deckList.size();
		for(int i = 0; i < originalSize; i++) {
			//generate random index ---> rand.nextInt((max - min) + 1) + min;
			randomCardIndex = random.nextInt((this.deckList.size()-1 - 0) +1) + 0;
			tempDeck.add(this.deckList.get(randomCardIndex));
			//remove from original deck
			this.deckList.remove(randomCardIndex);
		}
	
		this.deckList = tempDeck;
	
	}
	//Karten anzeigen
	public String toString() {
		String cardListOutput = "";
		for(Card aCard : this.deckList) {
			cardListOutput += "\n" + aCard.toString();
		}
		return cardListOutput;
	
	}
	
	public void removeCard (int i) {
		this.deckList.remove(i);
	}
	
	public Card getCard (int i) {
		return this.deckList.get(i);
	}
	
	public void addCard(Card addCard) {
		this.deckList.add(addCard);
	}
	
	//draws from the deck
	public void draw(game comingFrom) {
		this.deckList.add(getCard(0));
		comingFrom.removeCard(0);
	}
	
	//FURKAN
	// Start vom Code fÃ¼r den 1. Spielzug
		
	public void submitPlayerCard(String pid, Card card, Card.value declaredValue)
	throws InvalidRaceSubmissionException {

	ArrayList<Card> pHand = getPlayerHand(pid);
			
		if (card.getRace() != validRace) {
			JLabel message = new JLabel("Invalid player move, expected Race: " + validRace);
			message.setFont(new Font("Arial", Font.BOLD, 48));
			JOptionPane.showMessageDialog(null, message);
			throw new InvalidRaceSubmissionException(message, actual, expected);
		}
		
		else if (card.getValue())
	}


	class InvalidRaceSubmissionException extends Exception {
	private Card.Race expected;
	private Card.Race actual;

	public InvalidRaceSubmissionException(String message, Card.race actual, Card.Race expected) {
	this.actual = actual;
	this.expected = expected;
		}
	}*/
	
	//test dea obs funktioniert?
	
