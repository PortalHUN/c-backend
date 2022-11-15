const router = require("express").Router();

router
  .route("/")
  .get((req, res) => {
    res.json({ code: 200, message: "Welcome to the server!" });
  })
  .post((req, res) => {
    const { Title, Body, UserId } = req.body;
    if (!Title || !Body || !UserId)
      return res.json({ code: 500, message: "Argument missing..." });
    res.json({ code: 200, Title, Body, UserId });
  });

module.exports = router;
