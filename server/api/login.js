var express = require('express')
var query = require('../db')
var router = express.Router();
// 登录（暗号）

router.post('/',async (req,res)=>{
    const {uemail} = req.body;

    if(uemail === 'easonzhang443@qq.com'){
        return res.send({"msg": "nice"})
    }else{
        return res.send({"msg": 'notExist'})
    }

});

module.exports = router;