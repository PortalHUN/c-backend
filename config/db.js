const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "c-backend",
});

connection.connect((err) => {
  if (err) return console.log(err); //return console.log("[DB] No database connection...");
  console.log("[DB] Successful connection...");
});

module.exports = connection;
