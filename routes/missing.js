const router = require("express").Router();

router.route("*").get((req, res) => {
  res.json({ code: 404, message: "Missing page..." });
});

module.exports = router;
