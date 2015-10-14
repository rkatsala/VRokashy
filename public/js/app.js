define([
	'backbone',
	'router'
], function(Backbone, Router) {
	var init = function() {
		console.log('Load app.js');

		var router = new Router();
		Backbone.history.start(/*{pushState: true}*/);
	};

	return {
		init: init
	};
});