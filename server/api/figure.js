var express = require('express');
var query = require('../db');
const router = express.Router();

router.get('/',async (req,res)=>{

    var figure = await query('SELECT * FROM his_figure');
    figure = JSON.parse(JSON.stringify(figure));
    var length = figure.length;
    var random = parseInt(Math.random()*(length),10)

    res.send(figure[random])
});

module.exports = router;