const { resetPasswordMail } = require("../mailers/resetPassword_mailer");
const User = require("../models/user");


module.exports.profile = async function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

//render signUp page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Auth | Sign Up",
  });
};

//render singIn page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Auth | Sign In",
  });
};

//get the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash('error', 'Please Match the Password!')
    return res.redirect("back");
  }
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      const userCreate = await User.create(req.body);
      if (userCreate) {
        req.flash('success', 'User created Successfully!');
        return res.redirect("/users/sign-in"); 
      }
    } else {
      req.flash('error', 'User Already exist!');
      return res.redirect("back");
    }
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.createSession = async function (req, res) {
  req.flash('success', 'Logged in Successfully');
  return res.redirect("/users/profile");
};

//destroy session

module.exports.destroySession = function(req, res){
  req.logout(function(err){
    if(err){
      return console.log(err)
    }
    req.flash('success', 'You have logged out!');

  return res.redirect('/');
  });
}

//for password reset

exports.passwordReset = (req, res, next) => {
  
  try{

    const email = req.body.email;
    console.log(email);
    resetPasswordMail(email, 'hello sir', 'you are done')

  }catch(err){
    console.log(err)
  }
  
  return res.redirect('back');
  
}