const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
//for managing ejs layout
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");


//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require('./config/passport-google-oauth2-strategy')
const passportGithub = require('./config/passport-github2-strategy')
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(
  sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'expanded',
    prefix:'/css'
  })
);

app.use(express.urlencoded());
app.use(cookieParser());
//for static files
app.use(express.static("./assets"));
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
//use express router

app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store session cookie in db
app.use(
  session({
    name: "Auth",

    //todo change the secret befor deployment in productino mode
    secret: "ututututut",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.taxsifz.mongodb.net/?retryWrites=true&w=majority`,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "unable to connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server, ${err}`);
  }
  console.log(`server is running on port: ${port}`);
});
