var _ = require('underscore');
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');

//datail.jade
exports.detail = function(req,res){
	var id = req.params.id
	Movie.findById(id,function(err,movie){
		Comment
		.find({movie:id})
		.populate('from','name')
		.populate('reply.from reply.to','name')
		.exec(function(err,comments){
			console.log(comments)
			res.render('detail',{
				title:'imooc 详情页',
				movie: movie,
				comments:comments
			})
		})
	})
}

//admin.jade
exports.new = function(req,res){
	res.render('category_admin',{
		title:'imooc 后台分类录入页',
		category:{}
	})
}


//admin post movie
exports.save= function(req,res){
	var _category = req.body.category

	var category = new Category(_category)
	category.save(function(err,category){
		if(err){
			console.log(err)
		}
	 	res.redirect('/admin/category/list')
	})
}

//catetory listpage
exports.list = function(req,res){

	Category.fetch(function(err,categories){
		if(err){
			console.log(err)
		}
		res.render('categorylist',{
			title:'imooc 用户列表页',
			categories: categories
		})
	})
}