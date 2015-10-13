define([
	'jquery',
	'underscore',
	'backbone',
	'router'
], function($, _, Backbone, Router) {
	function init() {
		console.log('Load app.js');
		alert('Load app.js');
		var router = new Router();
		Backbone.history.start({pushState: true});
	};

	return {
		init: init
	};
});