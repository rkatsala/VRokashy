define([
	'backbone',
	'models/UserModel'
], function(Backbone, UserModel) {
	var UsersCollection = Backbone.Collection.extend({
		model: UserModel,
		url: '/users'
	});

	return UsersCollection;
});