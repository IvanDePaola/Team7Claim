package message;

public class AnsMessage {
	
	// Autor Robin Heiz
	
	private String rival, answer, lobbyName;
	
	public AnsMessage(String rival, String answer, String lobbyName) {
		super();
		this.rival = rival;
		this.answer = answer;
		this.lobbyName = lobbyName;
	}
	
	public AnsMessage( String rival, String answer) {
		super();
		this.rival = rival;
		this.answer = answer;
	}
	
	public AnsMessage(String rival) {
		super();
		this.rival = rival;
	}

	public String getRival() {
		return rival;
	}

	public void setRival(String rival) {
		this.rival = rival;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getLobbyName() {
		return lobbyName;
	}

	public void setLobbyName(String lobbyName) {
		this.lobbyName = lobbyName;
	}
	
	

}
