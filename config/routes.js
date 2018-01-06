var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');

module.exports = function(app){
//pre handle user
app.use(function(req,res,next){
	var _user = req.session.user
	app.locals.user = _user
	next()
})

//index.jade
app.get('/',Index.index)
//signup
app.post('/user/signup',User.signup)
//logout
app.get('/logout',User.logout)

app.get('/signin',User.showSignin)
app.get('/signup',User.showSignup)
//signin
app.post('/user/signin',User.signin)
//userlistpage
app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list)
//datail.jade
app.get('/movie/:id',Movie.detail)
//list.jade
app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)
//admin.jade
app.get('/admin/movie',User.signinRequired,User.adminRequired,Movie.new)
//admin update movie
app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update)
//admin post movie
app.post('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.savePoster,Movie.save)
//list delete movie
app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)

//comment
app.post('/user/comment',User.signinRequired,Comment.save)

//Catetory
app.get('/admin/category/new',User.signinRequired,User.adminRequired,Category.new)
app.post('/admin/category',User.signinRequired,User.adminRequired,Category.save)
app.get('/admin/category/list',User.signinRequired,User.adminRequired,Category.list)

//results
app.get('/results',Index.search)
}