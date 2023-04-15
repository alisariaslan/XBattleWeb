//ARGV-ARGC
var myArgs = process.argv.slice(2);
if (myArgs.length < 3)
  console.log('Invalid Args! Example: "node main.js localhost 80 -http');
var listen_ip = myArgs[0];
var listen_port = myArgs[1];
var mongodb_connection_string = myArgs[2];
var htt_type = myArgs[3];

//VARIABLES
var https = require('https');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./router/router');
var my_date = require('./my_modules/my_date');

//USE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(routes);

//HANDLEBAR
const handlebars = require('express3-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/*
//FLASH MESSAGES
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
})
*/

//MONGODB
const mongoose = require('mongoose');
mongoose.connect(mongodb_connection_string);
var db = mongoose.connection;
db.on('error', console.log.bind(console, my_date.getdatelog() + "MongoDB Connection Error!"));
db.once('open', function (callback) {
  console.log(my_date.getdatelog() +"MongoDB connection successfull.");
})

//HTTPS SERVER
function start_https() {
  if (myArgs.length < 6) {
    console.log('Invalid Args! Example: "node main.js localhost 80 MongoDBString -https key.ex cert.ex " ')
    return;
  }
  var ssl_key = myArgs[4];
  var ssl_cert = myArgs[5];
  const server = https.createServer({
    key: fs.readFileSync('ssl/' + ssl_key),
    cert: fs.readFileSync('ssl/' + ssl_cert),
    ca: myArgs[5] != null ? fs.readFileSync('ssl/' + myArgs[5]) : null, 
    address: listen_ip,
    port: listen_port
  }, app);
  server.listen(443);
  console.log('Host started at the address -> https://%s:%s', listen_ip, listen_port);
}

function start_http() {
  var server = app.listen(listen_port, listen_ip, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Host started at the address -> http://%s:%s', host, port);
  });
}

if (htt_type.includes('-https'))
  start_https();
else if (htt_type.includes('-http'))
  start_http();
else
  console.log('Invalid Args! Example: "node main.js localhost 80 MongoDBString -http / -https');
