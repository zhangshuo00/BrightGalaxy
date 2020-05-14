var express = require('express')
var query = require('../db')
var request = require('request')
var getShaKey = require('../crypto');
var router = express.Router();
var wx = require('../wxconfig.json')

router.post('/',async(req,res)=>{
    const {code} = req.body;
    var flag = false;

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

        request(options, async(response, err, body)=>{
            let _data = JSON.parse(body);
            console.log(_data);

            var skey1 = getShaKey(_data.session_key);
            var skey2 = getShaKey(_data.openid);
            var skey = skey1 + skey2;

            // 判断user表中是否有当前openid
            var allOpenid = await query('select openid from user');
            allOpenid = JSON.parse(JSON.stringify(allOpenid));

            for(var i=0;i<allOpenid.length;i++){
                // 如果有，则更新session_key 和 skey
                if(_data.openid === allOpenid[i]){
                    flag = true;
                    await query('update user set session_key=?,skey=? where openid=?',[_data.session_key,skey,_data.openid]);
                    return res.send({"skey": skey});
                }else{
                    continue;
                }
            }
            // 否则为新登录用户，则新增 openid,session_key,skey
            if(!flag){
                await query('insert into user (openid,session_key,skey) values (?,?,?)',[_data.openid,_data.session_key,skey]);
                return res.send({"skey": skey});
            }

        });
    }
});

module.exports = router;