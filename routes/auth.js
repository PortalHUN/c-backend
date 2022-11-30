const router = require("express").Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

///
/// https://github.com/gitdagray/mern_stack_course/blob/main/lesson_08-backend/controllers/authController.js
///

router.route("/auth/register").post(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).send("Missing Syntax.");
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  await db.query(
    `INSERT INTO users (Username, Email, Password) VALUES (${db.escape(username)}, ${db.escape(email)}, ${db.escape(hashed)})`,
    (err) => {
      if (err) return res.status(400).send("Username or email is already taken...");
      return res.status(200).send("User successfully registered.");
    }
  );
});

router.route("/auth/login").post(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Missing Syntax.");
  await db.query(
    `SELECT u.Username, u.Password FROM users AS u WHERE u.Username = ${db.escape(username)} && u.Active = 1;`,
    async (err, row) => {
      if (err) return res.status(500).send("Internal Server Error.");
      if (!row[0]) return res.status(401).send("Wrong username or password.");
      const success = await bcrypt.compare(password, row[0].Password);
      if (!success) return res.status(401).send("Wrong username or password.");

      const accessToken = jwt.sign(
        {
          Userinfo:{
            username: row[0].Username
          }
        },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:'30m'}
      );

      const refreshToken = jwt.sign({
        username: row[0].Username
      },
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: '7d'}
      )
      res.cookie('jwt', refreshToken, {
        sameSite: 'None',
        maxAge: 7*24*60*60*1000
      })

      return res.status(200).json({accessToken});
    }
  );
});
module.exports = router;
