define([
	'backbone'
], function(Backbone) {
	var UserModel = Backbone.Model.extend({
		idAttribute: '_id',
		url: '/users'
	});

	return UserModel;
});