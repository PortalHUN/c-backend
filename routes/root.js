const router = require("express").Router();

router.route("/").get((req, res) => {
  res.json({ code: 957, message: "OK" });
});

module.exports = router;
