var express = require('express');
var query = require('../db');
const router = express.Router();

router.get('/',async (req,res)=>{

    var dynasty = await query('SELECT * FROM dynasty');
    dynasty = JSON.parse(JSON.stringify(dynasty));

    res.send({"msg":"success","dynasty":dynasty})
});

module.exports = router;