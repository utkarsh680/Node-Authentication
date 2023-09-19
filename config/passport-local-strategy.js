const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
//authenticatin using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      //find the user and establish the identity
      try {
        const user = User.findOne({ email: email });

        if (!user || user.password != password) {
          console.log("Invalid Username/password");
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log("error", err);
        return done(err);
      }
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id)
});

//deserializing the use from the key in the cookies

passport.deserializeUser(async function(id, done){
    try {
        const user = await User.findById(id);
        if(user){
            return done(null, user);
        } 
      } catch (err) {
        console.log("errorr", err);
        return done(err);
      }
})

module.exports = passport;