define([
	'backbone',
	'views/usersList',
	'views/user'
], function(Backbone, UsersListView, UserView) {
	var Router = Backbone.Router.extend({
		routes: {
			"": "main",
			"users": "usersList",
			"users/:user_id": "user",
			"posts": "posts",
			"*any": "any"
		},

		main: function() {
			alert('Main page');
		},

		usersList: function() {
			var usersListView = new UsersListView();
			usersListView.render();

			console.log("usersList route");
		},

		user: function(user_id) {
			var userView = new UserView({id: user_id});
			userView.render();

			console.log("user route", user_id);
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