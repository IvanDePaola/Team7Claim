package message;

//Autor Ivan De Paola
public class StatMsg {
	
	private String lobName, winner, loser;

	public StatMsg(String lobName, String winner, String loser) {
		super();
		this.lobName = lobName;
		this.winner = winner;
		this.loser = loser;
	}

	public String getLobName() {
		return lobName;
	}

	public void setLobName(String lobName) {
		this.lobName = lobName;
	}

	public String getWinner() {
		return winner;
	}

	public void setWinner(String winner) {
		this.winner = winner;
	}

	public String getLoser() {
		return loser;
	}

	public void setLoser(String loser) {
		this.loser = loser;
	}
	
	

}
