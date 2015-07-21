/**
 * JavaScript for managing users
 * @author Michael DUBUIS
 */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 								    QUERY FROM JAVASCRIPT TO MODEL									   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// Ask to the model to logout
function signOut(){
	var content = {
			
	};
	var data = {"query":"signOut", "content":content};
	webSocket.send(JSON.stringify(data));
}

// Ask to the model to login
function signIn(){
	var username = $("#username").val();
	var password = $("#password").val();
	var content = {
			"username":username,
			"password": password
	};
	var data = {"query":"signIn", "content":content};
	webSocket.send(JSON.stringify(data));
}

// Ask to the model to register
function register(){
	$("input").removeClass("inputWrong");
	var error = false;
	var password = $("#password").val();
	var passwordConfirm = $("#passwordConfirm").val();
	var username = $("#username").val();
	var name = $("#name").val();
	var firstname = $("#firstname").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	if(password != passwordConfirm || password == "") {
		$("#password").addClass("inputWrong");
		$("#passwordConfirm").addClass("inputWrong");
		error = true;
	}
	if(username == "") {
		$("#username").addClass("inputWrong");
		error = true;
	}
	if(name == "") {
		$("#name").addClass("inputWrong");
		error = true;
	}
	if(firstname == "") {
		$("#firstname").addClass("inputWrong");
		error = true;
	}
	if(email == "" || !isEmail(email)) {
		$("#email").addClass("inputWrong");
		error = true;
	}
	if(phone == "" || !isPhone(phone)) {
		$("#phone").addClass("inputWrong");
		error = true;
	}
	if(error) return;
	var content = {
			"password":password,
			"username":username,
			"name":name,
			"firstname":firstname,
			"email":email,
			"phone":phone
	};
	var data = {"query":"register", "content":content};
	webSocket.send(JSON.stringify(data));
}

// Ask to the model to update current account
function updateAccount(){
	var oldPassword = $("#oldpassword").val();
	var password = $("#password").val();
	var passwordConfirm = $("#passwordConfirm").val();
	var username = $("#username").val();
	var name = $("#name").val();
	var firstname = $("#firstname").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	// TODO Fields verification
	var content = {
			"oldpassword":oldPassword,
			"password":password,
			"username":username,
			"name":name,
			"firstname":firstname,
			"email":email,
			"phone":phone
	};
	var data = {"query":"updateAccount", "content":content};
	webSocket.send(JSON.stringify(data));
}

// Ask to the model data of current account
function loadAccount(){
	var content = {};
	var data = {"query":"loadAccount", "content":content};
	webSocket.send(JSON.stringify(data));
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 								    ANSWER FROM MODEL TO JAVASCRIPT									   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// Login answer
function login(content){
	if(content.ok == "ok"){
		includeHeader();
		includeMenu();
		includeHome();
		includeFavorites();
	}else{
		printFeedback(content.feedback, false);
	}
}

// Logout answer
function logout(content){
	removeHeader();
	removeMenu();
	includeLogin();
	$("#username").val(content.username);
}

// Registration answer
function registration(content){
	if(content.ok = "ok"){
		includeLogin();
		$("#username").val(content.username);
		printFeedback(content.feedback, true);
	}
}

// Update account answer
function accountUpdated(content){
	if(content.ok = "ok"){
		includeHeader();
		includeMenu();
		includeHome();
	}else{
		if(content.message == "wrong password")
			$("#oldpassword").css("color", "#FF0000");
		if(content.message == "not the same password"){
			$("password").css("color", "#FF0000");
			$("passwordConfirm").css("color", "#FF0000");
		}
	}
}

// Display account
function accountLoaded(content){
	$("#username").val(content.username);
	$("#name").val(content.name);
	$("#firstname").val(content.firstname);
	$("#email").val(content.email);
	$("#phone").val(content.phone);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 											HTML GENERATOR											   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function getLoginForm(){
	var div = document.createElement("div");
	$(div).attr("id", "login");
	for ( var i = 0 ; i < loginForm.length ; i++ ) {
		$(div).append(getElement(loginForm[i]));
	}
	return div;
}

function getRegistrationForm(){
	var div = document.createElement("div");
	$(div).attr("id", "registration");
	for ( var i = 0 ; i < registrationForm.length ; i++ ) {
		$(div).append(getElement(registrationForm[i]));
	}
	return div;
}

function getUpdateAccountForm(){
	var div = document.createElement("div");
	$(div).attr("id", "accountUpdate");
	for ( var i = 0 ; i < updateAccountForm.length ; i++ ) {
		$(div).append(getElement(updateAccountForm[i]));
	}
	return div;
}