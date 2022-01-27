/*
 * Entry Point of Application
 * ************************** */ 

console.log("démarrage de l'application");

require("dotenv").config();
const app = require("express")(),
  session = require("express-session"),
  MySQLStore = require("express-mysql-session")(session),
  { engine } = require("express-handlebars"),
  bodyParser = require("body-parser"),
  config = require("./config/config"),
  db = require("./config/db"),
  port = process.env.PORT || 3000;

// Connection to Mysql Server
db.connect();
const sessionStore = new MySQLStore(config);

// Manage your Cookie
app.use(
  session({
    key: "name-cookie",
    secret: "secret-name-cookie",
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
  })
);

// Manage your request body from form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Engine of templating html (handlebars)
app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

// Check route (middleware)
app.use("*", (req, res, next) => {
  res.locals.user = req.session.user;
  console.log("session", req.session);
  next();
});

const router = require("./router");
app.use(router);

app.listen(port);
