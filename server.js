console.log("démarrage de l'application");

require("dotenv").config();
const app = require("express")(),
  mysql = require("mysql"),
  session = require("express-session"),
  MySQLStore = require("express-mysql-session")(session),
  { engine } = require("express-handlebars"),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 3000;

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const sessionStore = new MySQLStore(config);

db = mysql.createConnection(config);
const util = require("util");
db.query = util.promisify(db.query).bind(db);

db.connect();

// global.query = db.query

app.use(session({
	key: 'name-cookie',
	secret: 'secret-name-cookie',
	store: sessionStore,
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.use('*', (req, res, next) => {
    res.locals.user = req.session.user
    console.log('session', req.session)
    next()
})

const router = require("./router");
app.use(router);

app.listen(port);
