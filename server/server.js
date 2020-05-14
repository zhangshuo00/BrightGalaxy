const express = require('express');
const path = require('path');
var query = require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');

var login = require('./api/login');
var sign = require('./api/sign');
var today = require('./api/today');
var figure = require('./api/figure');
var glossary = require('./api/glossary');
var getdynasty = require('./api/getdynasty');
var getDynastyItems = require('./api/getDynastyItems');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.get('/',(req,res)=>{
    // console.log(req);
    res.send('ok');
});
app.use('/login',login); //登录api
app.use('/sign',sign); //注册
app.use('/today',today); //today
app.use('/figure',figure); //历史人物
app.use('/glossary',glossary); //名称解释
app.use('/getdynasty',getdynasty); //获取朝代
app.use('/getDynastyItems',getDynastyItems); //获取朝代事件

app.listen(8080,(err)=>{
    if(err) console.error(err);
    // var host = server.address().address;
    // var port = server.address().port;
    console.log('server start on 8080...');
})
module.exports = app;