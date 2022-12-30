//VARIABLES
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

//MY VARIABLES
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

//MY USE
app.use(routes);

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
mongoose.connect('mongodb://localhost/battleground');
var db = mongoose.connection;
db.on('error', console.log.bind(console, my_date.getdatelog() + "connection error"));
db.once('open', function (callback) {
  console.log(my_date.getdatelog() + "connection succeeded");
})

//LISTEN
var server = app.listen(80, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(my_date.getdatelog() + 'my app is listening at http://%s:%s', host, port);
});