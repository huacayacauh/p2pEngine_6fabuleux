package model.network.communication.service;

import java.math.BigInteger;

import util.Hasher;
import util.secure.AsymKeysImpl;
import util.secure.ElGamal;
import util.secure.ElGamalSign;
import model.Application;
import model.user.User;
import net.jxta.endpoint.Message;

public class TransmitAccountService extends Service {

	@Override
	public String getServiceName() {
		return this.getClass().getName();
	}

	private boolean checkMessageFormat(Message m) {
		return 
				m.getMessageElement("to") != null &
				m.getMessageElement("userSignR") != null &
				m.getMessageElement("userSignS") != null &
				m.getMessageElement("content") != null;
	}
	
	private boolean checkValidation(User u, BigInteger s, BigInteger r){
		ElGamal eg = new ElGamal(u.getKey());
		ElGamalSign sign = new ElGamalSign(r, s);
		return eg.verifySignature(u.toString().getBytes(), sign);
	}
	
	@Override
	public boolean handleMessage(Message m) {
		if(!checkMessageFormat(m)) return false;
		
		String to = new String(m.getMessageElement("to").getBytes(true));
		String content = new String(m.getMessageElement("content").getBytes(true));
		BigInteger userSignR = new BigInteger(m.getMessageElement("userSignR").getBytes(true));
		BigInteger userSignS = new BigInteger(m.getMessageElement("userSignS").getBytes(true));
		
		User user = new User(content);
		
		if(!checkValidation(user, userSignS, userSignR)){
			// TODO process in case of wrong message !
			System.err.println("THIS MESSAGE IS SHIT !");
		}else{
			// TODO Need Modification !!!
			Application.getInstance().getManager().addUser(user);
		}
		
		return true;
	}

}
