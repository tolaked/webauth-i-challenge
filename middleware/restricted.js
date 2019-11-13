const Users = require("../Users/users");
const bcrypt = require("bcryptjs");

module.exports = restricted;

function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}
