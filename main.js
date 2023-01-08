//VARIABLES
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var my_date = require('./my_modules/my_date');
var routes = require('./router/router');

//USE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({ cookie: { maxAge: null } }));
app.use(routes);

//ARGV-ARGC
const myArgs = process.argv.slice(2);
if (myArgs.length != 3) 
  return console.log("Yetersiz argüman! (IP,PORT,MONGODB CONNECTION STRING)")
const listen_ip = myArgs[0];
const listen_port = myArgs[1];
const mongodb_connection_string = myArgs[2];

//HANDLEBAR SET
const handlebars = require('express3-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//FLASH MESSAGES
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
})

//MONGODB
const mongoose = require('mongoose');
mongoose.connect(mongodb_connection_string);
var db = mongoose.connection;
db.on('error', console.log.bind(console, my_date.getdatelog() + "connection error"));
db.once('open', function (callback) {
  console.log(my_date.getdatelog() + "db connection succeeded");
})

//LISTEN
var server = app.listen(listen_port, listen_ip, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(my_date.getdatelog() + 'my app is listening at http://%s:%s', host, port);
});