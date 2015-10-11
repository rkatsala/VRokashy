define(['collections/users', 'views/user'], function(UserCollection, UserView) {
	var Router = Backbone.Router.extend({
		routes: {
			"users": "users",
			"*any": "any"
		},

		users: function() {
			var collection = new UserCollection();
			var renderView = function() {
				var view = new UserView({
					collection: collection
				});
			};
			collection.fetch({reset: true});
			collection.bind('reset', renderView);
		},

		any: function() {
			alert('404');
		}
	});

	return Router;
});