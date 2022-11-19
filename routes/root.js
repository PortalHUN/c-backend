const router = require("express").Router();

router
  .route("/")
  .get((req, res) => {
    return res.status(200).send("OK");
  })
  .post((req, res) => {
    console.log(req.headers);
    return res.json(req.body);
  });

module.exports = router;
