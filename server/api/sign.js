var express = require('express')
var query = require('../db')
var router = express.Router();
// 注册（暗号）

router.get('/',async (req,res)=>{
    
    res.send({msg: 'error'})
});

module.exports = router;