package message;
// Autor Robin Heiz
public class ResetPwMsg {
	
	private String userName, newPW, eMail;
	
	
	public ResetPwMsg(String userName, String newPW, String eMail) {
		super();
		
		this.userName = userName;
		this.newPW = newPW;
		this.eMail = eMail;
		
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getNewPW() {
		return newPW;
	}


	public void setNewPW(String newPW) {
		this.newPW = newPW;
	}


	public String geteMail() {
		return eMail;
	}


	public void seteMail(String eMail) {
		this.eMail = eMail;
	}
	
	
	
	

}
