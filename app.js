var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var port = process.env.PORT || 3001;
var multipart = require('connect-multiparty')
var app = express();
//cookie的中间件
var cookieParser = require('cookie-parser')
//引入session
var session = require('express-session')
//session持久化
var mongoStore = require('connect-mongo')(session)

var dbUrl = 'mongodb://localhost:27017/imooc'
var logger = require('morgan')
mongoose.Promise = global.Promise; 
mongoose.connect(dbUrl,{useMongoClient: true})

//mongoose loading
var models_path = __dirname + '/app/models'
var walk = function(path){
	fs
	.readdirSync(path)
	.forEach(function(file){
		var newPath = path + '/' + file
		var stat = fs.statSync(newPath)

		if(stat.isFile()){
			if(/(.*)\.(js|coffee)/.test(file)){
				require(newPath)
			}
		} else if (stat.isDirectory()){
			walk(newPath)
		}
	})
}
walk(models_path)
console.log('没问题')
app.set('views','./app/views/pages');
app.set('view engine', 'jade');
//获取req.body的必要组件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(multipart())
app.use(cookieParser())
app.use(session({
	secret:'imooc',
	store : new mongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}))


if('development' === app.get('env')){
	 app.set('showStackError',true)
	 app.use(logger(':method :url :status'))
	 app.locals.pretty = true
	 mongoose.set('debug',true)
}



require('./config/routes')(app)
//静态资源路径
app.use(express.static(path.join(__dirname,'public')))
app.locals.moment = require('moment')
app.listen(port);

console.log('imooc started on port 3000')

