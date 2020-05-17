var express = require('express');
var query = require('../db');
var router = express.Router();

router.post('/',async (req,res)=>{
    const { skey,contackEmail,content } = req.body;

    var openid = await query('SELECT openid FROM user WHERE skey=?',[skey]);
    openid = JSON.parse(JSON.stringify(openid))[0].openid;

    var date = new Date();

    await query('INSERT INTO feedback (openid,contack_email,content,date) values (?,?,?,?)',[openid,contackEmail,content,date]);
    res.send({"msg":"feedback success"})
});

module.exports = router;