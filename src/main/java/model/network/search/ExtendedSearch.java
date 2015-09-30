package model.network.search;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import model.advertisement.AbstractAdvertisement;
import model.network.NetworkInterface;
import model.network.search.parser.SearchParser;
import net.jxta.discovery.DiscoveryService;
/**
 * 
 * @author SixFabuleux©
 *
 */

public class ExtendedSearch <T> extends Search{

	/**
	 * Appel le constructeur de la classe mere
	 * @param n
	 * @param pg
	 * @param attribute
	 * @param exact
	 */
	public ExtendedSearch(NetworkInterface n, String pg, String attribute, boolean exact) {
		super(n, pg, attribute, exact);
	}
	
	
	/**
	 * 
	 */
	@Override
	public void search(String value, long maxWaitTime, int waitResult){
		Boolean expressionIsCorrect = launchParser(value);
		String searchValue;
		// on decoupe la requête selon le mot clé OR
		String [] result = value.split(" OR ");
		
		if(! expressionIsCorrect){
			System.out.println("Expression non valide");
			return;
		}
		// on boucle sur le tableau contenant les objets et on envoie les requêtes
		for( String element : result){
			searchValue = !exact ? "*" + element + "*": element;
			discovery.getRemoteAdvertisements(null, DiscoveryService.ADV, attribute, searchValue, 10, this);
		}
		
		
		long waiting = maxWaitTime;
		if(maxWaitTime != 0) {
			while(waiting > 0 && (results.size() < waitResult || waitResult == 0)) {
				long currentTime = System.currentTimeMillis();
				try {
					Thread.sleep(5);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				waiting -= System.currentTimeMillis()-currentTime;
			}
		}
	}
	
	public Boolean launchParser(String value){
		InputStream stream = new ByteArrayInputStream(value.getBytes(StandardCharsets.UTF_8));
		SearchParser parser = new SearchParser(stream);
		try {

			return parser.checkRequest(stream);
		} catch (model.network.search.parser.ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			return false;
		}
	}
}
