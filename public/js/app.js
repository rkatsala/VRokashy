define([
	'jquery',
	'underscore',
	'backbone',
	'router'
], function($, _, Backbone, Router) {
	function init() {
		var router = new Router();
		Backbone.history.start({pushState: true});
	};

	return {
		init: init
	};
});