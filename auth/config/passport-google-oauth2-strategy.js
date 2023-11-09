const passport = require("passport");
const googleStrategy = require( 'passport-google-oauth2' ).Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy({
    clientID: "830315740217-hsmg97e8t1hgcg1rr566d5fl3h2fkqe3.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/oauth2callback",
  },
  async function(accessToken, refreshToken, profile, done){
    //find the user
    const user = await User.findOne({email: profile.emails[0].value})
    if(user){
        //if found, set this user as req.user
        return done(null, user);
    }else{
        //if not found, create the user and set at as req.user
        const user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randonBytes(20).toString('hex')
        });
        return done(null, user);
    }
  }
));

module.exports = passport;
