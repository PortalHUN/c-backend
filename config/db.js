const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "application",
});

connection.connect((err) => {
  if (err) return console.log(err); //return console.log("[DB] No database connection...");
  console.log("[DB] Successful connection...");
});

module.exports = connection;
