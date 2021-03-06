requirejs.config({
	paths: {
		jquery: 'libs/jquery/dist/jquery',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		text: 'libs/text/text',
		templates: '../templates',
		cookies: 'libs/js-cookie/src/js.cookie'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

requirejs(['app'], function (App) {
	console.log("RequireJS config run");
	App.init();
});
