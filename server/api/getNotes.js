var express = require('express');
var query = require('../db');
var router = express.Router();

router.post('/',async (req,res)=>{
    const { skey } = req.body;

    var openid = await query('SELECT openid FROM user WHERE skey=?',[skey]);
    openid = JSON.parse(JSON.stringify(openid))[0].openid;

    var notes = await query('SELECT eventid,time,title,content,tag FROM event WHERE openid=?',[openid]);
    notes = JSON.parse(JSON.stringify(notes));
    res.send({"msg":"success","notes":notes});
});

module.exports = router;