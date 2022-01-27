const mysql = require("mysql");

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

db = mysql.createConnection(config);
const util = require("util");
db.query = util.promisify(db.query).bind(db);

module.exports = {
  connect: () => {
    db.connect((err) => {
      if (err) console.error("error connecting: " + err.stack);
      console.log("connected as id " + db.threadId);
    });
  }
};
