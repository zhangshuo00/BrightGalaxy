var express = require('express');
var query = require('../db');
var router = express.Router();

router.post('/',async (req,res)=>{
    const { skey,date,title,content,tag } = req.body;

    var openid = await query('SELECT openid FROM user WHERE skey=?',[skey]);
    openid = JSON.parse(JSON.stringify(openid))[0].openid;

    await query('INSERT INTO event (time,content,title,tag,openid) VALUES (?,?,?,?,?)',[date,content,title,tag,openid]);

    res.send({"msg":"success"});
});

module.exports = router;