var express = require('express');
var query = require('../db');
const router = express.Router();

router.post('/',async (req,res)=>{
    const { dyname } = req.body;
    // e.g
    // const dyid =  '6';
    var dyid = await query('SELECT dyid FROM dynasty WHERE dynasty_name=?',[dyname]);
    dyid = JSON.parse(JSON.stringify(dyid))[0].dyid;
    var hisEvents = await query('SELECT * FROM history WHERE dyid=? ORDER BY historyid ASC',[dyid]);
    hisEvents = JSON.parse(JSON.stringify(hisEvents));

    res.send(hisEvents)

});

module.exports = router;