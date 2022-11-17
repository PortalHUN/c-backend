const router = require('express').Router();
const db = require('../config/db');

router.route('/auth/register')
.post((req,res)=>{
    const {Username, Email, Password} = req.body;
    if(!Username || !Email || !Password) return res.json({code:500, message: "Missing Username, Email or Password..."});
    db.query(`INSERT INTO users (Username, Email, Password) VALUES (${db.escape(Username)}, ${db.escape(Email)}, ${db.escape(Password)})`, (err, result)=>{
        if(err) return res.json({code:500, message:"This username or email is already taken."});
        return res.json({code:200, message:"OK"});
    })

});

module.exports = router;