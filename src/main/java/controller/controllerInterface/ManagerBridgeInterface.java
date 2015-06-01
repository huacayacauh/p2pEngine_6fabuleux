package controller.controllerInterface;

public interface ManagerBridgeInterface {
	public void registration(String nick, String password, String name, String firstName, String email, String phone);
	public boolean login(String nick, String password);
	public boolean updateAccount(String nick, String oldPassword, String newPassword, String name, String firstName, String email, String phone);
	
	public void addItem(String title, String category, String description, String image, String country, String contact, String lifeTime, String type );
	public void removeItem(String title);
	public void updateItem(String title, String category, String description, String image, String country, String contact, String lifeTime, String type );
}
