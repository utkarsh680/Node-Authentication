const User = require("../models/user");

module.exports.profile = function (req, res) {
 return  res.render('home', {
    title : 'home'
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
  const user = await User.findOne({ email: req.body.email });

  try {
    if(user){
        //handle password does't match
        if(user.password != req.body.password){
            return res.redirect('back')
        }
        //handle session creation
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile')

    }else{
        return res.redirect('back');
    }
  } catch (error) {
    console.log(error);
  }
};
