/**
 * JavaScript for managing items
 * @author Michael DUBUIS
 */
var itemsAreLoaded = false;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 								    QUERY FROM JAVASCRIPT TO MODEL									   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
 * Ask to the model to add a new item
 */
function addItem(){
	var title = $("#"+itemForm+" #title").val();
	var category = $("#"+itemForm+" #category").val();
	var contact = $("#"+itemForm+" #contact").val();
	var country = $("#"+itemForm+" #country").val();
	var date = $("#"+itemForm+" #date").val();
	var description = $("#"+itemForm+" #description").val();
	var image = $("#"+itemForm+" #image").attr("src");
	if(image == null) image = "";
	var lifetime = $("#"+itemForm+" #lifetime").val();
	var type = $("#"+itemForm+" #type").val();
	// Fields verification
	var content = {
			"title":title,
			"category":category,
			"contact":contact,
			"country":country,
			"date":date,
			"description":description,
			"image":image,
			"lifetime":lifetime,
			"type":type
	};
	sendQuery("addItem", content);
}
/**
 * Ask to the model to remove item's itemKey
 * @param itemKey
 */
function removeItem(itemKey){
	if(confirm("Are you sure to remove this item ?")){
		var content = {"itemKey":itemKey};
		sendQuery("removeItem", content);
	}
}
/**
 * Ask to the model to update item's itemKey
 * @param itemKey
 */
function updateItem(itemKey){
	var title = $("#"+itemForm+" #title").val();
	var category = $("#"+itemForm+" #category").val();
	var contact = $("#"+itemForm+" #contact").val();
	var country = $("#"+itemForm+" #country").val();
	var date = $("#"+itemForm+" #date").val();
	var description = $("#"+itemForm+" #description").val();
	var image = $("#"+itemForm+" #image").attr("src");
	if(image == null) image = "";
	var lifetime = $("#"+itemForm+" #lifetime").val();
	var type = $("#"+itemForm+" #type").val();
	// Fields verification
	var content = {
			"itemKey":itemKey,
			"title":title,
			"category":category,
			"contact":contact,
			"country":country,
			"date":date,
			"description":description,
			"image":image,
			"lifetime":lifetime,
			"type":type
	};
	sendQuery("updateItem", content);
}
/**
 * Ask to the model data of item's itemKey
 * @param itemKey
 */
function loadItem(itemKey){
	var content = {
			"itemKey":itemKey
			};
	sendQuery("loadItem", content);
}
/**
 * Ask to the model to send all data items (for the current user)
 */
function loadItems(){
	if(itemsAreLoaded)
		return;
	sendQueryEmpty("loadItems");
	itemsAreLoaded = true;
}
/**
 * Ask to the model to send item's itemKey
 * @param itemKey
 */
function editItem(itemKey){
	var content = {
			"itemKey":itemKey
	};
	sendQuery("loadItem", content);
}
/**
 * Ask to the model to send item's category
 */
function loadCategories(){
	sendQueryEmpty("loadCategories");
}
/**
 * Ask to the model to send item's type
 */
function loadType(){
	sendQueryEmpty("loadType");
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 								    ANSWER FROM MODEL TO JAVASCRIPT									   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function itemRemoved(content){
	var id = removePunctuation(content.itemKey);
	$("#"+id).detach();
	$("#"+itemForm).replaceWith(getItemAddForm());
}

function itemUpdated(content){
	var id = removePunctuation(content.itemKey);
	$("#"+id).replaceWith(newRowItem(content));
	$("#"+itemForm).replaceWith(getItemAddForm());
}

function itemsLoaded(content){
	$("#"+itemList).append(newRowItem(content));
}

function itemAdded(content){
	$("#"+itemList).append(newRowItem(content));
	$("#"+itemForm).replaceWith(getItemAddForm());
}

function itemLoaded(content){
	itemFormComplet();
	setTimeout(function(){
		$.each(content, function(key, value){
			$("#"+itemForm+" #"+key).val(value);
		});
		$("#"+itemForm+" #image").attr("src", content.image);
		$("#itemForm").find("h1").empty();
		$("#itemForm").find("h1").append("Item : "+content.itemKey);
		$("#addButton").attr("onclick", "updateItem('"+content.itemKey+"');");
		$("#addButton").empty();
		$("#addButton").append("Update Item");
	}, 10);
}

function categoryLoaded(content){
	var option = document.createElement("option");
	$(option).append(content.category);
	$("#"+itemForm+" #category").append(option);
}

function typeLoaded(content){
	var option = document.createElement("option");
	$(option).append(content.type);
	$("#"+itemForm+" #type").append(option);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 											HTML GENERATOR											   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
 * Get a form for add item (with buttons "Add" and "Cancel")
 * @returns Element "div"
 */
function getItemAddForm(){
	var div = document.createElement("div");
	return div;
}

function itemFormComplet(){
	cancelItem();
	$("#content").append(getClone(itemAddForm));
	loadCategories();
	loadType();
}
/**
 * Get a table for display item list
 * @param id - put this id to the table
 * @returns Element "table"
 */
function getTableItem(id){
	var table = getClone(itemTable);
	table.setAttribute("id", id);
	return table;
}
/**
 * Get a row for an item
 * @param content JSONObject (title, description and itemKey)
 * @returns Element "tr"
 */
function newRowItem(content){
	var row = document.createElement("tr");
	$(row).attr("id", removePunctuation(content.itemKey));
	// Title cell
	var cell1 = document.createElement("td");
	$(cell1).attr("class", "rowTitle");
	$(cell1).attr("onclick", "editItem('"+content.itemKey+"');");
	$(cell1).append(document.createTextNode(content.title));
	$(row).append(cell1);
	// Description cell
	var cell2 = document.createElement("td");
	$(cell2).attr("class", "rowDescription");
	$(cell2).attr("onclick", "editItem('"+content.itemKey+"');");
	if(content.description.length > 400)
		$(cell2).append(document.createTextNode(content.description.substring(0, 400)+" [...]"));
	else
		$(cell2).append(document.createTextNode(content.description));
	$(row).append(cell2);
	// Buttons Cell
	var cell3 = document.createElement("td");
	$(cell3).attr("class", "rowActions");
	// Remove Button
	var removeButton = document.createElement("a");
	$(removeButton).attr("class", "button buttonRemove");
	$(removeButton).attr("onclick", "removeItem('"+content.itemKey+"');");
	//$(removeButton).append(document.createTextNode("Remove"));
	$(cell3).append(removeButton);
	$(row).append(cell3);
	// Add to favorites Button
	var favoritesButton = document.createElement("a");
	$(favoritesButton).attr("class", "button buttonFavorites");
	$(favoritesButton).attr("onclick", "addItemFavorites('"+content.itemKey+"');");
	//$(removeButton).append(document.createTextNode("Remove"));
	$(cell3).append(favoritesButton);
	$(row).append(cell3);
	return row;
}

/**
 * Erase form with id "itemForm"
 */
function cancelItem(){
	$("#"+itemForm).detach();
}