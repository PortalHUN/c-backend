#!/usr/bin/env node
require("dotenv").config();
require("./config/db");
const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("cors")());

app.use(require("./routes/root"));
app.use(require("./routes/auth"));
app.use(require("./routes/missing"));

app.listen(port, () => {
  console.log(`[S] Server started on port ${port}...`);
});
