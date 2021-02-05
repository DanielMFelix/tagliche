var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

(async() => {
	const db = require("./db");
	console.log("insert");
	//await db.insertAccounts({username:"daniel", password:"daniel", email:"danielmfelix@live.com"});
	
	const contas = await db.selectAccounts();
	
    console.log(contas);
    console.log("username é:", contas[0].username);
    console.log("password é", contas[0].password);
	console.log("email é", contas[0].email);
	console.log("username 1 é:", contas[1].username);
    console.log("password 1 é", contas[1].password);
	console.log("email 1 é", contas[1].email);
	aqui = await db.existe();
	console.log("teste funçãoo existe:", aqui);
	console.log("length de sera é:",aqui.length);

	search = await db.searchAccount("daniel","daniel");
	console.log("teste search", search[0].username);
	console.log("lenght de search é", search.length);
	console.log("search eh:", search);
	extract = await db.selectExercises("daniel");
	console.log("EXTRACT É", extract);

	

})();

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'arte3457',
	database : 'nodelogin'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	if (request.session.loggedin==true){
		response.sendFile(path.join(__dirname + "/index-log.html"));
	}
	else{
	response.sendFile(path.join(__dirname + '/index.html'));
	};
});

app.use(express.static(__dirname + '/public'));

app.post('/auth', async function(request, response) {
	const db = require ("./db")
	var user_name = request.body.username;
	var pswd = request.body.password;
	account = await db.searchAccount(user_name,pswd);
	console.log("accounte é:",account);
	console.log("acooung lenght é:", account.length);
//console.log("user_name:",user_name," | pswd:",pswd," | username:", account[0].username,"|password:",account[0].password);
	if(user_name && pswd){
		
		
		if (account.length > 0 ) {
			request.session.loggedin = true;
			request.session.username = user_name;
			response.redirect('/');
			console.log("após login o username é:", user_name);
		} else {response.send('Incorrect Username and/or Password!');
				}response.end();
			}
	 else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/saveAnswer', async function(request, response){
	console.log("SAVER SAVER SAVER");
	const db = require ("./db")
	var answer = request.body.answer;
	console.log("ANSWER É ISSO AQUI:", answer);
	// var id = request.body.form-ID;
	// console.log('get id É:', id);
	var day = request.body.buttonSaver;
	console.log("BOTÃO DE DIA É:",day);
	// console.log("ID PARA SALVAR É:", id);
	console.log("tipo do id é:",typeof(day));
	day = JSON.parse(JSON.stringify(day));
	console.log("tipo do id com json parse é:", typeof(day));
	obj = JSON.parse(day);
	console.log("objeto json parsel",obj);
	console.log("tipo objeto json parsel",typeof(obj));
	console.log("week = ", obj[0]["week"]);
	console.log("whatDay = ", obj[0]["whatDay"]);
	console.log("username é:", request.session.username);
	await db.updateExercises(obj[0]["week"],obj[0]["whatDay"],request.session.username,answer);
})

app.get('/database', async function(request, response) {
	if (request.session.loggedin) {
		const db = require("./db");
		extract =await db.selectExercises(request.session.username);
		response.send(extract)
		console.log("extract database eh:", extract);
		console.log("username database eh",request.session.username);
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.get("/username", async function(request,response){
	if (request.session.loggedin) {
		response.send(request.session.username)
	}
});


app.listen(41415);




