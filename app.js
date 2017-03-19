var express = require('express');
var http = require('http');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// 设置视图文件夹和渲染引擎
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

var entries = [];
app.locals.entries = entries; // 使entries在所有的views中都可用

app.use(logger('dev'));

// 如果用户提交表单。产生一个 req.body 变量
// extended 选项是必须的
app.use(bodyParser.urlencoded({ extended: false }));

// 访问根路径，返回 views/index.ejs
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/new-entry', function(req, res) {
    res.render('new-entry');
});

// 定义路由处理 '/new-entry' 下的 POST 请求
app.post('/new-entry', function(req, res) {
    // 如果用户没有填写title或body，则返回400错误
    if (!req.body.title || !req.body.body) {
        res.status(400).send('Entries must have a title and body');
        return;
    }
    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });
    // 重定向到主页查看新的entry
    res.redirect('/');
});

// 404 page
app.use(function(req, res) {
    res.status(400).render('404');
});


http.createServer(app).listen('8888');
