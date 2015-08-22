package view.interlocutors.contrat;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import controller.ManagerBridge;
import view.interlocutors.AbstractInterlocutor;

public class RemoveClause extends AbstractInterlocutor {

	public RemoveClause() {
	}

	@Override
	public void run() {
		if(!isInitialized())
			return;
		try {
			JSONObject c = getJSON(content);
			String contratID = c.getString("contratID");
			String id = c.getString("id");
			if(ManagerBridge.removeClause(contratID, id)){
				JSONObject data = new JSONObject();
				data.put("query", "clauseRemoved");
				c.put("feedback", "Clause removed !");
				c.put("feedbackOk", true);
				data.put("content", c);
				com.sendText(data.toString());
			} else {
				JSONObject data = new JSONObject();
				data.put("query", "clauseNotRemoved");
				c.put("feedback", "Clause can't be removed !");
				c.put("feedbackOk", false);
				data.put("content", content);
				com.sendText(data.toString());
			}
		} catch (JSONException e) {
			e.printStackTrace();
		} finally {
			this.reset();
		}
	}

}