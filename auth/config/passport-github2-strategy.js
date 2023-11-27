const passport = require("passport");
const githubStrategy = require("passport-github2").Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use a new strategy for google login

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUB_AUTH_CLIENTID,
      clientSecret: process.env.GITHUB_AUTH_SECRET,
      callbackURL: "http://localhost:8000/users/auth/github/callback",
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString("hex"),
        });
        return done(null, newUser);
      }
      return done(null, user);
    }
  )
);

//serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user);
});

//deserialize the user from the key in the cookies
passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;