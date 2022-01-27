const express = require("express"),
  bcrypt = require("bcrypt"),
  router = express.Router();

const { login, auth, logout, register, home, form } = require("./controllers");

router.route("/").get(home).post(form);

router.route("/login").get(login).post(auth);

router.route("/logout").get(logout);

router.route("/register").post(register);

module.exports = router;
