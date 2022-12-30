function validateForm() {

  let username = document.forms["myForm"]["username"].value;
  let mail = document.forms["myForm"]["email"].value;
  let password = document.forms["myForm"]["password"].value;
  let repassword = document.forms["myForm"]["repassword"].value;

  if (username < 3) {
    alert("Your username length must be at least 4 characters. And must contain at least one letter.");
    return false;
  } else if (username > 20) {
    alert("Your username must be at most 20 characters. And must contain at least one letter.");
    return false;
  } else if (mail < 3) {
    alert("Your email length must be at least 4 characters. And must contain at least one letter.");
    return false;
  } else if (mail > 40) {
    alert("Your email must be at most 40 characters. And must contain at least one letter.");
    return false;
  } else if (password < 3) {
    alert("Your password length must be at least 4 characters. And must contain at least one letter.");
    return false;
  } else if (password > 30) {
    alert("Your password must be at most 30 characters. And must contain at least one letter.");
    return false;
  } else if (password != repassword) {
    alert("Your passwords does not match");
    return false;
  } else if (document.getElementById("cpatchaTextBox").value != code) {
    alert("Invalid captcha! Please try again.");
    createCaptcha();
    return false;
  } 
}