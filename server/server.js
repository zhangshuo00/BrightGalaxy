const express = require('express');
const path = require('path');
var query = require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');

var login = require('./api/login');
var sign = require('./api/sign');

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


app.listen(2020,(err)=>{
    if(err) console.error(err);
    // var host = server.address().address;
    // var port = server.address().port;
    console.log('server start on 2020...');
})
module.exports = app;