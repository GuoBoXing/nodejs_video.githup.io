module.exports = function(grunt){

	grunt.initConfig({
		 watch:{
		 	jade:{
			 	files:['views/**'],
			 	options:{
			 		livereload:true
			 	}
		 	}
		 },
		 js:{
		 	files: ['public/js/**','models/**/*.js','schemas/**/*.js'],
		 	tasks: ['jshint'],
		 	options:{
		 		livereload:true
		 	}
		 },
		 jshint:{
		 	options:{
		 		jshintrc:'.jshintrc',
		 		ignores:['public/libs/**/*.js']
		 	},
		 	all: ['public/js/*.js','test/**/*.js','app/**/*.js']
		 },
		 less: {
		 	development:{
		 		options:{
		 			compress:true,
		 			yuicompress:true,
		 			optimization:2
		 		},
		 		files: {
		 			'public/build/index.css':'public/less/index.less'
		 		}
		 	}
		 },
		 uglify: {
		 	development:{
		 		files:{
		 			'public/build/admin.min.js':'public/js/admin.js',
		 			'public/build/detail.min.js':[
		 				'public/js/detail.js'
		 			]
		 		}
		 	}
		 },
		 nodemon: {
		 	dev :{
		 		options:{
		 			file: 'app.js',
		 			args:[],
		 			ignoredFiles:['README.md','node_modules/**','.DS_Store'],
		 			watchedExtensions:['js'],
		 			watchedFolders: ['./'],
		 			debug:true,
		 			delayTime:1,
		 			env:{
		 				PORT:3000
		 			},
		 			cwd:__dirname	
		 		}
		 	}
		 },
		 mochaTest:{
		 	options:{
		 		reporter:'spec'
		 	},
		 	src:['test/**/*.js']
		 },
		 concurrent:{
		 	tasks:['nodemon','watch'],
		 	options:{
		 		logConcurrentOutput:true
		 	}
		 }
	})


	//只要有文件添加修改，删除，它就会重新注册你在它里面的任务
	grunt.loadNpmTasks('grunt-contrib-watch')
	//实时监听app。js
	grunt.loadNpmTasks('grunt-nodemon')
	//监控慢任务，SASS，LESS
	grunt.loadNpmTasks('grunt-concurrent')
	//加载单元测试模块
	grunt.loadNpmTasks('grunt-mocha-test')
	
	grunt.loadNpmTasks('grunt-contrib-less')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-jshint')


	//设置这个的目的是为了不要让程序在运行中因为一些语法的错误而终端整个grunt的服务
	grunt.option('force',true)
	//传入一个默认的任务
	grunt.registerTask('default',['concurrent'])
	//调用mocha的任务
	grunt.registerTask('test',['mochaTest'])
}