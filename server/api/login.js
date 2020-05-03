var express = require('express')
var query = require('../db')
var request = require('request')
var getShaKey = require('../crypto');
var router = express.Router();
var wx = require('../wxconfig.json')

router.post('/',async (req,res)=>{
    const {code} = req.body;

    if(code){
        let options = {
            method: 'POST',
            url: 'https://api.weixin.qq.com/sns/jscode2session?',
            formData: {
                appid : wx.appid,
                secret: wx.secret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        };

        request(options, (response, err, body)=>{
            let _data = JSON.parse(body);
            console.log(_data);

            var skey1 = getShaKey(_data.session_key);
            var skey2 = getShaKey(_data.openid);
            var skey = skey1 + skey2;
            return res.send({
                "data": _data,
                "skey": skey
            })

        });
    }


});

module.exports = router;