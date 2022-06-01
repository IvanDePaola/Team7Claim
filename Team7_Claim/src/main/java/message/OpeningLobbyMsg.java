package message;
// Autor Rpbin Heiz
public class OpeningLobbyMsg {
	
	private String nameOfLobby, userName;
	//private String password;
	//private boolean mode;
	
	public OpeningLobbyMsg(String nameOfLobby, /*String password,*/ String userName/*,boolean mode*/) {
		super();
		this.nameOfLobby = nameOfLobby;
		//this.password = password;
		this.userName = userName;
		//this.mode = mode;
		
	}
	
	public OpeningLobbyMsg() {
		super();
		
	}

	public String getNameOfLobby() {
		return nameOfLobby;
	}

	public void setNameOfLobby(String nameOfLobby) {
		this.nameOfLobby = nameOfLobby;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

/*	public boolean isMode() {
		return mode;
	}

	public void setMode(boolean mode) {
		this.mode = mode;
	}*/
	
	
	

}
