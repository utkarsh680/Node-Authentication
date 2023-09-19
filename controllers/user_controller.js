const User = require("../models/user");

module.exports.profile = async function (req, res) {
return res.render('home', {
  title: 'User Profile'
})
};

//render signUp page
module.exports.signUp = function (req, res) {
  return res.render("sign-up", {
    title: "Auth | Sign Up",
  });
};

//render singIn page
module.exports.signIn = function (req, res) {
  return res.render("sign-in", {
    title: "Auth | Sign In",
  });
};

//get the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      const userCreate = await User.create(req.body);
      if (userCreate) {
        return res.redirect("/users/sign-in");
      }
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.createSession = async function (req, res) {
 
};
