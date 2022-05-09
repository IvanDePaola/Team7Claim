package ch.model;

@Entity
public class User {
	
	private Long id;
	private String userName;
	private String email;
	private String password;
	private UserRolle userRolle;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserRolle getUserRolle() {
		return userRolle;
	}
	public void setUserRolle(UserRolle userRolle) {
		this.userRolle = userRolle;
	}
	
	
	
	

}
