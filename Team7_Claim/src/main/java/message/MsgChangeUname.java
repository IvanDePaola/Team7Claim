package message;
// Autor Robin Heiz
public class MsgChangeUname {
	
	private String newUserName, userName;
	
	
	public MsgChangeUname(String newUserName, String userName) {
		super();
		this.newUserName = newUserName;
		this.userName = userName;
	}


	public String getNewUserName() {
		return newUserName;
	}


	public void setNewUserName(String newUserName) {
		this.newUserName = newUserName;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}
	

}
