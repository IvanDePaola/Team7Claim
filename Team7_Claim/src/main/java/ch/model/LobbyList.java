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
			if (name.equals(l.getNameLobby()))
				lobby = l;
		}
		return lobby;
	}
	
	//Lobby hinzufügen
	public static void addLobby(Lobby l) {
		lobList.add(l);
	}
	
	//Autor Ivan De Paola
	public static AnsMessage LobbyAccess(String name, String username) {
		
		for (Lobby lob : lobList) {
			System.out.println("1");
			if (lob.getNameLobby().equals(name)) {
				return new AnsMessage("Lobby exists");				
			}else {
				if (lob.getNames().size() == 2) {
				return new AnsMessage("Lobby is full");
			}else {
				if(lob.getNames().get(0).equals(username)) {
					return new AnsMessage("same");
				}
			
				}
				
			}
		}
		return new AnsMessage("ok");
	}
		
	
	
	//Autor Ivan De Paola
	public static boolean containsLobbyName(String lobbyName) {
		boolean newList = false;
		for (Lobby l : lobList) {
			if (l.getNameLobby().equals(lobbyName)) {
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
			if (lobbyName.equals(l.getNameLobby()))
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
			if(l.getNames().size() == onlyPlayer) {
				host = l.getNames().get(0);
				return new AnsMessage("ok", host, l.getNameLobby());
			}
		}
		return new AnsMessage("Lobby private");
	
	}

}
