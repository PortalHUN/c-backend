const router = require("express").Router();

router.route("/").get((req, res) => {
  res.json({ code: 200, message: "Welcome to the server!" });
});

module.exports = router;
