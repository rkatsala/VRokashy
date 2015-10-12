define([
	'jquery',
	'underscore',
	'backbone',
	'router'
], function($, _, Backbone, Router) {
	function init() {
		Router.init();
	};

	return {
		init: init
	};
});