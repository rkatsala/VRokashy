define([
	'backbone',
	'views/users'
], function(Backbone, UsersView) {
	var Router = Backbone.Router.extend({
		routes: {
			"users": "users",
			"posts": "posts",
			"*any": "any"
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