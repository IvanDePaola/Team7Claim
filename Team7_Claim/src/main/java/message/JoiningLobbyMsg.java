package message;
// Autor Robin Heiz
public class JoiningLobbyMsg {
	
	private String nameOfLobby, userName;
	
	
	public JoiningLobbyMsg(String nameOfLobby, String userName) {
		super();
		this.nameOfLobby = nameOfLobby;
		this.userName = userName;
	}
	
	public JoiningLobbyMsg() {
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
	
	
	
	

}
