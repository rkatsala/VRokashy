define([
	'backbone',
	'views/users'
], function(Backbone, UsersView) {
	var Router = Backbone.Router.extend({
		routes: {
			"": "main",
			"users": "users",
			"posts": "posts",
			"*any": "any"
		},

		main: function() {
			alert('Main page');
		},

		users: function() {
			var usersView = new UsersView();
			usersView.render();

			console.log("users route");
		},

		posts: function() {
			alert('Posts');
		},

		any: function() {
			alert('404');
		}
	});

	return Router;
});