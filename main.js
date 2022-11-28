
//VARIABLES
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var options = {
  index: "release.html"
};

//USES
app.use('/', express.static('public', options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//MONGODB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/battleground');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
  console.log("connection succeeded");
})

//SING UP FORM
app.post('/sign_up', function (req, res) {
  var uname = req.body.username;
  var email = req.body.email;
  var pass = req.body.password;
  var repass = req.body.repassword;
  //CHECK
  if (uname == "" || email == "" || pass == "" || repass == "" || uname < 3 || uname > 20 || email < 3 || email > 40 || pass < 3 || pass > 30 || (pass != repass))
    return res.redirect('error.html');

  var data = {
    "username": uname,
    "email": email,
    "password": pass,
    "emailVerified": false
  }

  db.collection('users').insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });

  return res.redirect('/');
})











//LISTEN
var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('my app is listening at http://%s:%s', host, port);
});