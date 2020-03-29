//引入依赖
var createError = require('http-errors'); //向html输入错误信息
var express = require('express');
var path = require('path');
var logger = require('morgan');//打印终端日志
var multer = require('multer'); 
var cookieSession = require('cookie-session');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

//创建服务器
var app = express();

//设置模板引擎
// view engine setup
app.set('views', path.join(__dirname, 'views'));  //指定要读的ejs模板位置
app.set('view engine', 'ejs'); //设置模板引擎使用ejs


//中间件配置
app.use(logger('dev')); //日志

//中间件安装-设置body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//中间件multer
// let upload = multer({dest:path.join(__dirname,'public','upload')})

//分发到不同的目录
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(req.url.indexOf('user') !==-1 || req.url.indexOf('reg') !==-1){
    cb(null, path.join(__dirname,'public','upload','user'))
  }else if(req.url.indexOf('banner') !==-1 ){
    cb(null, path.join(__dirname,'public','upload','banner'))
  }else{
    cb(null, path.join(__dirname,'public','upload','product'))
  }
 }
})
let upload = multer({storage})
app.use(upload.any());   //只允许上传图片

//中间件cookieSession
app.use(cookieSession({
	name:'NZ1909',
  keys:['aa','bb','cc'],
  maxAge:1000 *60*60*24//保留cookie的时间
}))

//多资源托管
app.use(express.static(path.join(__dirname, 'public','template')));
app.use('/admin',express.static(path.join(__dirname, 'public','admin')));
app.use(express.static(path.join(__dirname, 'public')));


//接口响应
// app.use('/api/home',  require('./routes/test'));
// app.use('/users', require('./routes/users'));
// 接口响应-用户端
app.all('/api/*',require('./routes/api/params'))
app.use('/api/reg',require('./routes/api/reg'))
app.use('/api/login',require('./routes/api/login'))
app.use('/api/user',require('./routes/api/user'))
app.use('/api/logout',require('./routes/api/logout'))



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 404处理函数
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
    //用户端接口不存在 返回{err:1,msg:'不存在的接口'}
        if(req.url.includes('./api')){
            res.send({err:1,msg:'不存在的接口'})
    //管理端接口不存在，返回 res.render('error.ejs')
        }else if(req.url.includes('/admin')){
            res.render('error');
        }else{
    //资源托管没有对应的页面 返回404.html
            res.sendFile(path.join(__dirname,'public','template','404.html'))
        }

  // res.render('error');
});

module.exports = app;
