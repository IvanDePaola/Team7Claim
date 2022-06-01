package message;
// Autor Robin Heiz
public class VerifyMsg {
	private String userName, answer;
	private int code;
	
	
	public VerifyMsg(int code, String userName) {
		super();
		this.code = code;
		this.userName = userName;
	}
	
	public VerifyMsg() {
		super();
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
	
	

}
