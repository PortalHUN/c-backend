const router = require("express").Router();

router
  .route("/")
  .get((req, res) => {
    return res.status(200).send("OK");
  })
  .post((req, res) => {
    return res.json(req.body);
  });

module.exports = router;
