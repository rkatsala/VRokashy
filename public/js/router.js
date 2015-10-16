define([
	'backbone',
	'views/users',
	'views/user'
], function(Backbone, UsersListView, UserView) {
	var Router = Backbone.Router.extend({
		routes: {
			"": "main",
			"users": "users",
			"users/:uid": "user",
			"posts": "posts",
			"*any": "any"
		},

		main: function() {
			alert('Main page');
		},

		users: function() {
			var usersListView = new UsersListView();
			usersListView.render();

			console.log("usersList route");
		},

		user: function(uid) {
			var userView = new UserView();
			userView.render();

			console.log("user route", uid);
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