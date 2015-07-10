/**
 * JavaScript for managing contrats
 * @author Michael DUBUIS
 */
var contratList = "contratList";
var itemContratList = "itemContratList"
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 								    QUERY FROM JAVASCRIPT TO MODEL									   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function loadContrats(){
	sendQueryEmpty("loadContrats");
}
function loadContrat(id){
	var content = {"contratID":id};
	sendQuery("loadContrat", content);
	emptyContent();
	$("#content").append(getElement(contratForm[0]));
	$("#objects").append(getTableItem(itemContratList));
}
function loadItemForContrat(){
	var itemKey = $("#itemFavoritesDisplayer #itemKey").text();
	if($("#contratID").text() == ""){
		newContrat();
	}else{
		var contrat = $("#contratID").text();
		var content = {
				"itemKey":itemKey,
				"contratID":contrat
		};
		sendQuery("loadItemForContrat", content);
	}
}
function newContrat(){
	var titleNewContrat = $("#titleNewContrat").val();
	var content = {"title":titleNewContrat};
	sendQuery("newContrat", content);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 								    ANSWER FROM MODEL TO JAVASCRIPT									   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function contratCreated(content) {
	emptyContent();
	$("#content").append(getElement(contratForm[0]));
	$("#contratID").append(document.createTextNode(content.contratID));
	$("#objects").append(getTableItem(itemContratList));
	$("#contratForm").find("h1").text(content.title);
}
function itemForContratLoaded(content) {
	$("#contratID").text(content.contratId);
	$("#"+itemContratList).append(newRowItemContrat(content));
}
function contratsLoaded(content) {
	$("#"+contratList).append(newRowContrat(content));
}
function transfertRuleLoaded(content){
	$("#rules table").append(newRowTransfertRule(content));
}
function contratLoaded(content) {
	$("#contratForm").find("h1").text(content.title);
	$("#contratID").append(document.createTextNode(content.contratID));
}
function signatoryAdded(content) {
	$("#signatories").append(newRowSignatory(content));
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 											HTML GENERATOR											   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function getContrat(){
	var div = document.createElement("div");
	$(div).attr("id", "content");
	$(div).append(getElement(contratDisplay[0]));
	$(div).append(getElement(contratTable[0]));
	//$(div).append(getElement(contratForm[0]));
	$(div).append(getElement(contratDisplay[1]));
	return div;
}
function newRowContrat(content) {
	var row = document.createElement("tr");
	$(row).attr("id", removePunctuation(content.contratID));
	$(row).attr("onclick", "loadContrat('"+content.contratID+"');");
	var cell1 = document.createElement("td");
	$(cell1).attr("class", "rowTitle");
	$(cell1).append(content.title);
	var cell2 = document.createElement("td");
	$(cell2).attr("class", "rowState");
	$(cell2).append(content.state);
	var cell3 = document.createElement("td");
	$(cell3).attr("class", "rowActions");
	$(row).append(cell1);
	$(row).append(cell2);
	$(row).append(cell3);
	return row;
}
// For add an item in table item contrat list
function newRowItemContrat(content) {
	var row = document.createElement("tr");
	$(row).attr("id", "contrat"+removePunctuation(content.contratID));
	// Title cell
	var cell1 = document.createElement("td");
	$(cell1).attr("class", "rowTitle");
	$(cell1).append(content.title);
	// $(cell1).attr("onclick", "loadItemFavorites('"+content.itemKey+"');");
	$(row).append(cell1);
	// Description cell
	var cell2 = document.createElement("td");
	$(cell2).attr("class", "rowDescription");
	// cell2.setAttribute("onclick", "loadItemFavorites('"+content.itemKey+"');");
	if(content.description.length > 100)
		$(cell2).append(content.description.substring(0, 100)+" [...]");
	else
		$(cell2).append(content.description);
	$(row).append(cell2);
	// Buttons Cell
	var cell3 = document.createElement("td");
	$(cell3).attr("class", "rowActions");
	// Remove Button
	var removeButton = document.createElement("a");
	$(removeButton).attr("class", "buttonRemove");
	$(removeButton).attr("onclick", "removeItemContrat('"+content.itemKey+"');");
	//removeButton.appendChild(document.createTextNode("Remove"));
	$(cell3).append(removeButton);
	$(row).append(cell3);
	return row;
}
// For add a transfert rule in table
function newRowTransfertRule(content) {
	var row = document.createElement("tr");
	$(row).attr("id", "rule"+removePunctuation(content.itemKey));
	
	var cell1 = document.createElement("td");
	$(cell1).attr("class", "rowItem")
	var label11 = document.createElement("label");
	$(label11).append(content.itemKey);
	$(label11).attr("class", "hidden");
	var label21 = document.createElement("label");
	$(label21).append(content.itemTitle);
	$(cell1).append(label11);
	$(cell1).append(label21);
	
	var cell2 = document.createElement("td");
	$(cell2).attr("class", "rowFrom");
	var label12 = document.createElement("label");
	$(label12).append(content.from);
	$(label12).attr("id", "from");
	$(label12).attr("class", "hidden");
	var label22 = document.createElement("label");
	$(label22).append(content.fromFriendlyNick);
	$(cell2).append(label12);
	$(cell2).append(label22);
	
	var cell3 = document.createElement("td");
	$(cell3).attr("class", "rowTo");
	if(content.to)
		$(cell3).append(content.to);
	
	$(row).append(cell1);
	$(row).append(cell2);
	$(row).append(cell3);
	return row;
}
// For add a signatory in table
function newRowSignatory(content) {
	var row = document.createElement("tr");
	$(row).setAttribute("id", "signatories"+removePunctuation(content.publicKey));
	
	var cell1 = document.createElement("td");
	var label11 = document.createElement("label");
	$(label11).append(content.publicKey);
	$(label11).attr("class", "hidden");
	var label21 = document.createElement("label");
	$(label21).append(content.friendlyNick);
	$(cell1).append(label11);
	$(cell1).append(label21);
	
	$(row).append(cell1);
	
	return row;
}