define([
	'jquery',
	'underscore',
	'backbone',	
	'views/users'
], function($, _, Backbone, UsersView) {
	var Router = Backbone.Router.extend({
		routes: {
			"users": "users",
			"*any": "any"
		}
	});

	var init = function() {

		var router = new Router();

		console.log("Router init")

		router.on('route:users', function() {
			var usersView = new UsersView();
			usersView.render();

			console.log("users route");
		});

		router.on('route:any', function() {
			alert('404');
		});

		Backbone.history.start({pushState: true});
	};


	return {
		init: init
	};
});