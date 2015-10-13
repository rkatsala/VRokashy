requirejs.config({
	paths: {
		jquery: 'libs/jquery/dist/jquery',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		text: 'libs/text/text',
		templates: '../templates'
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
	console.log("requirejs config run");
	alarm("requirejs config run");	
	App.init();
});

/*require(function(){
	console.log("requirejs config run");
	alarm("requirejs config run");
});*/