/**
 * JavaScript for managing bootstrap
 * @author Michael DUBUIS
 */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 								    QUERY FROM JAVASCRIPT TO MODEL									   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function loadIP(){
	sendQueryEmpty("loadIP");
}

function sendBootstrap(){
	$(".inputWrong").removeClass("inputWrong");
	var error = false;
	var feedback = "";
	var emailReceiver = $("#emailReceiver").val();
	if(!isEmail(emailReceiver)){
		error = true;
		$("#emailReceiver").addClass("inputWrong");
	}
	var emailSender = $("#emailSender").val();
	if(!isEmail(emailSender)) {
		error = true;
		$("#emailSender").addClass("inputWrong");
	}
	var passwordSender = $("#passwordSender").val();
	if(passwordSender == "") {
		error = true;
		$("#passwordSender").addClass("inputWrong");
	}
	var content = {
			"emailReceiver":emailReceiver,
			"emailSender":emailSender,
			"passwordSender":passwordSender
			};
	sendQuery("sendBoostrap", content);
}

function sponsorBootstrap() {
	var f = $("#bootstrapFile")[0].files[0]; 
	var contents;
	if (f) {
		var r = new FileReader();
		r.onload = function(e) { 
			contents = e.target.result;
			var content = {"fileContent":contents}
			sendQuery("sponsorBootstrap", content);
		}
		r.readAsText(f);
	} else { 
		$("#bootstrapFile").addClass("inputWrong");
		return;
	}
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 								    ANSWER FROM MODEL TO JAVASCRIPT									   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function ipLoaded(content){
	$("#IP").append("<tr><td>"+content.ip+"</td></tr>");
}

function bootstrapSent(content){
	printFeedback(content.feedback, true);
}

function bootstrapNotSent(content){
	printFeedback(content.feedback, false);
}

function sponsorBootstrapSaved(content){
	includeBoostrapSetting();
	printFeedback(content.feedback, true);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 											HTML GENERATOR											   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function getBootstrapSetting(){
	return getElement(boostrapSetting[0]);
}

function getBootstrapInvitation(){
	return getElement(boostrapInvitation[0]);
}