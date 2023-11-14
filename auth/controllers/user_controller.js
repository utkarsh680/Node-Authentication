const { resetPasswordMail } = require("../mailers/resetPassword_mailer");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const crypto = require('crypto');

// Function to generate a random secret key
const generateRandomSecretKey = () => {
  return crypto.randomBytes(32).toString('hex'); // 32 bytes converts to a 64-character hex string
};

// Generate a random secret key
const secretKey = generateRandomSecretKey();



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
    req.flash("error", "Please Match the Password!");
    return res.redirect("back");
  }
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      const userCreate = await User.create(req.body);
      if (userCreate) {
        req.flash("success", "User created Successfully!");
        return res.redirect("/users/sign-in");
      }
    } else {
      req.flash("error", "User Already exist!");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.createSession = async function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/users/profile");
};

//destroy session

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return console.log(err);
    }
    req.flash("success", "You have logged out!");

    return res.redirect("/");
  });
};


//for password reset
exports.passwordReset = (req, res, next) => {
  try {
    const email = req.body.email;
    console.log(email);

    // Generate JWT token
    const resetToken = generateResetToken(email);

    // Send the resetToken to the user (e.g., via email)
    resetPasswordMail(
      email,
      "Password Reset",
      `Use the following link to reset your password: ${resetToken}`
    );
  } catch (err) {
    console.log(err);
  }

  return res.redirect("back");
};

// Function to generate JWT token
const generateResetToken = (email) => {
  const payload = { email };
  const options = { expiresIn: "1h" }; // Set an expiration time for the token

  return jwt.sign(payload, secretKey, options);
};
