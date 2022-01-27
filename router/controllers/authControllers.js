const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  console.log("login Page");
  res.render("login");
};

exports.auth = async (req, res) => {
  const { name, password } = req.body;
  const user = await db.query(
    `SELECT name, password FROM users WHERE name = '${name}';`
  );

  if (user) {
    const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      req.session.user = {
        name: user[0].name,
      };
      res.render("index");
    } else res.render("login");
  } else res.render("login");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("name-cookie");
    console.log(req.session);
    res.redirect("/");
  });
};

exports.register = async (req, res) => {
  const { name, password, email } = req.body;
  console.log("register", name);

  const hash = bcrypt.hashSync(password, 10);

  console.log("hash", hash);

  await db.query(
    `INSERT INTO users (name, email, password) VALUES ( '${name}', '${email}', '${hash}' );`
  );

  res.render("login");
};
