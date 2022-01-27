exports.home = async (req, res) => {
  res.render("index", {
    articles: await db.query("SELECT * FROM articles;"),
  });
};

exports.form = async (req, res) => {
  const { title, price } = req.body;

  await db.query(
    `INSERT INTO articles (title, price) VALUES ( '${title}', '${price}' );`
  );

  res.render("index", {
    flash: "Votre article à bien été créé !",
    articles: await db.query("SELECT * FROM articles;"),
  });
};
