package ch.model;

import java.util.ArrayList;

import message.AnsMessage;

//Autor Ivan De Paola
public class LobbyList {
	
	public static ArrayList<Lobby> lobList;
	public final static int onlyPlayer = 1;
	
	private LobbyList() {
		
	}
	
	public static ArrayList<Lobby> getLobbyList() {
		return lobList;
	}

	//Methode zum Lobby erstellen
	public static Lobby createLobby(String name) {
		Lobby lobby = null;
		for (Lobby l : lobList) {
			if (name.equals(l.getName()))
				lobby = l;
		}
		return lobby;
	}
	
	//Lobby hinzufügen
	public static void addLobby(Lobby l) {
		lobList.add(l);
	}
	
	//Autor Ivan De Paola
	public static AnsMessage LobbyAccess(String name, String username, String password) {
		String userName = "";
		for (Lobby lob : lobList) {
			System.out.println("1");
			if (lob.getName().equals(name)) {
				System.out.println("LOBBY EXISTS ALREADY");
				if (lob.getNames().size() == 2) {
					return new AnsMessage("Lobby is full");
				}
				System.out.println("2");
				if(lob.getNames().get(0).equals(username)) {
					return new AnsMessage("same");
				}
				if(lob.isMode()) {
					if(lob.getPassword().equals(password)) {
						userName = lob.getNames().get(0);
						lob.getNames().add(username);
						return new AnsMessage("ok", userName, lob.getName());
					}else {
						return new AnsMessage("password");
					}
				}
				if(!lob.isMode()){
					userName = lob.getNames().get(0);
					lob.getNames().add(username);
					return new AnsMessage("ok", userName, lob.getName());
				}
		}
	}
		return new AnsMessage("not");
	}
	
	//Autor Ivan De Paola
	public static boolean containsLobbyName(String lobbyName) {
		boolean newList = false;
		for (Lobby l : lobList) {
			if (l.getName().equals(lobbyName)) {
				newList = true;
				return newList;
			}
		}
		return newList;
	}
	
	//Autor Ivan De Paola
	public static AnsMessage clear(String lobbyName) {
		Lobby lob1 = null;
		for (Lobby l : lobList) {
			if (lobbyName.equals(l.getName()))
				lob1 = l;
		}
			if(lob1 != null) {
			lobList.remove(lob1);
			return new AnsMessage("cleared");
			}
			return new AnsMessage("not cleared");
	}
	
	//Autor Ivan De Paola
	public static AnsMessage randoLobbyjoiner() {
		if(lobList.size() == 0) {
			return new AnsMessage("no lobby found");
		}
		String host = "";
		for(Lobby l : lobList) {
			if(!l.isMode() && l.getNames().size() == onlyPlayer) {
				host = l.getNames().get(0);
				return new AnsMessage("ok", host, l.getName());
			}
		}
		return new AnsMessage("Lobby private");
	
	}

}
