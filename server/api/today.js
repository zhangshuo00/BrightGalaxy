var express = require('express');
var query = require('../db');
const router = express.Router();

router.post('/',async(req,res)=>{
    const {date} = req.body;
    // 例如
    // const date = '5月13日';

    var events = await query('SELECT content FROM today WHERE time=?',[date]);
    events = JSON.parse(JSON.stringify(events));

    res.send({"msg":"success","events":events});
})

module.exports = router;