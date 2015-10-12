requirejs.config({
	baseUrl: 'js/libs',
	paths: {
		jquery: 'jquery/dist/jquery',
		underscore: 'underscore/underscore',
		backbone: 'backbone/backbone',
		text: 'text/text',
		templates: '../templates'
	}/*,
	shim: {
		backbone: ['underscore', 'jquery']
	}*/
});

requirejs(['app'], function (App) {
	App.init();
});
