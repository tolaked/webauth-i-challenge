const Users = require("../Users/users");
const bcrypt = require("bcryptjs");

module.exports = restricted;

function restricted(req, res, next) {
  const { username, password } = req.headers;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
}
