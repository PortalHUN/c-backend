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
  if (!username || !password) return res.status(400).send("Missing Information.");
  await db.query(
    `SELECT u.Username, u.Password FROM users AS u WHERE u.Username = ${db.escape(username)};`,
    async (err, row) => {
      if (err){
        console.log(err)
        return res.status(500).send("Internal Server Error.");
      }
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
      {expiresIn:'30s'}
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

router.route("/auth/refresh").post((req,res)=>{
  const cookies = req.cookies;

  if(!cookies?.jwt) return res.status(401).send("No cookie.");

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded)=>{
      if(err) return res.status(403).send("Forbidden.");

      db.query(`SELECT Username FROM users WHERE Username = ${db.escape(decoded.username)};`,(err, row)=>{
        if(err) return res.status(500).send(err);
        if(!row[0]) return res.status(401).send("Unauthorized.");

        const accessToken = jwt.sign(
          {
            Userinfo:{
              username: row[0].Username
            }
          },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'30s'}
        );

        res.status(200).json(accessToken);
      })
    })
})

router.route('/auth/logout').post((req,res)=>{
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.status(204);
  res.clearCookie("jwt");
  res.status(200).send("Cookie Cleared");
})

module.exports = router;
