var express = require('express');
var query = require('../db');
const router = express.Router();

router.get('/',async (req,res)=>{

    var glossary = await query('SELECT * FROM glossary');
    glossary = JSON.parse(JSON.stringify(glossary));
    var length = glossary.length;
    console.log(length)
    var random = parseInt(Math.random()*(length),10)

    res.send(glossary[random])
});

module.exports = router;