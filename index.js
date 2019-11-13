const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const authRouter = require("./auth/authRouter");

const server = express();

const sessionConfig = {
  name: "Adetola",
  secret: "make it a little long and keep it safe!",
  cookie: {
    maxAge: 1000 * 60, // you need it if the cookie is to survive !!
    secure: false, // with secure, the cookie only gets set when https !!
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require("./data/dbConfig"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
