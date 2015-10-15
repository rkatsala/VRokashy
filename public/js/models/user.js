define([
	'backbone'
], function(Backbone) {
	var UserModel = Backbone.Model.extend({
		idAttribute: '_id',
		url: '/users',
		parse: function(response) {
			var name = response.name;
			name.full = name.first + " " + name.last;

			return response;
		}
	});

	return UserModel;
});