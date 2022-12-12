const router = require('express').Router();

router.use(require('../middleware/verifyJWT'));

router.route('/notes').get((req,res)=>{
    res.json({message:"pog"});
})

module.exports = router;
