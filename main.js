var express = require('express');
const bodyParser = require("body-parser");
var app = express();
var db = require("./mysqlManager.js");
var cookieParser = require('cookie-parser');
var context = this;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


var server = app.listen(8080, function () {
  console.log("Server started on port " + server.address().port + " on " + Date());
  context.database = new db();
  context.database.checkConnection();
});

app.get('/', function (req, res) {
  res.sendFile('./view/index.html', { root: __dirname });
});

app.get('/js/:javaScript', function (req, res) {
  res.sendFile('./js/' + req.params.javaScript, { root: __dirname });
});

app.get('/pic/:image', function (req, res) {
  res.sendFile('./images/' + req.params.image, { root: __dirname });
});

app.get('/pic/expert/:image', function (req, res) {
  res.sendFile('./images/experts/' + req.params.image+".jpg", { root: __dirname });
});

app.post('/search/', function (req, res) {
  context.database.getAllExperts(res);
});

app.post('/login', function (req, res) {
  cookiesHandler(req.cookies);
  console.log("login >>>>>>> "+JSON.stringify(req.body));
  context.database.checkValidUser(req.body,res);
});

app.post('/register', function (req, res) {
  cookiesHandler(req.cookies);
  console.log("register >>>>>>> "+JSON.stringify(req.body));
  context.database.addUser(req.body,res);
});

function cookiesHandler(cookie){
  console.log("Cookies :  ", cookie);
}




