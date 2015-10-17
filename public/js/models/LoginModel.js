define([
	'backbone'
], function(Backbone) {
	var LoginModel = Backbone.Model.extend({
		urlRoot: '/login'
	});

	return LoginModel;
});