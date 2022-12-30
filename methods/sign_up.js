
var User = require('.././models/user');
var my_date = require('.././my_modules/my_date');

//SING UP FORM
exports.signUp = (req, res) => {
    var uname = req.body.username;
    var email = req.body.email;
    var pass = req.body.password;
    var repass = req.body.repassword;

    //CHECK
    if (uname == "" || email == "" || pass == "" || repass == "" || uname < 3 || uname > 20 || email < 3 || email > 40 || pass < 3 || pass > 30 || (pass != repass))
        return res.redirect('error');

    User.findOne({ username: uname }, function (err, user) {
        if (user) {
            console.log("User already exists");
            res.render('register', {
                message: true
            });
        }
        else {
            console.log("User doesn't exists");
            var newUser = new User({ username: uname, email: email, password: pass, sysRegisterDate: my_date.getdate() });
            newUser.save((error, data) => {
                if (error) {
                    console.log(my_date.getdatelog() + error);
                    return res.redirect('error');
                }
                else {
                    console.log(my_date.getdatelog() + "New user has registered!\n" + data);
                    return res.redirect('verify_warn');
                }
            });
        }
    });
}
