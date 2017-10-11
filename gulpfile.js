var gulp = require('gulp'),
    initGulpTasks = require('react-component-gulp-tasks');

var taskConfig = {

	component: {
		name: 'Lightbox'
	},

	example: {
		src: 'examples/src',
		dist: 'examples/dist',
		standalone: true,
		files: [
			'.gitignore',
			'.npmignore',
            'images/*',
			'favicon.ico',
			'index.html'
		],
		scripts: [
			'app.js'
		],
		less: [
			'example.less'
		]
	}

};

initGulpTasks(gulp, taskConfig);
