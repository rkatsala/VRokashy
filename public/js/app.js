define(['router'], function(Router) {
	function init() {
		var router = new Router();

		Backbone.history.start({pushState: true});
	}

	return {
		init: init
	}
});