const { login, auth, logout, register } = require("./authControllers");
const { home, form } = require("./homeControllers");

module.exports = {
    // Auth
    login, auth, logout, register,

    // Home
    home, form
}
