define([
	'underscore',
	'backbone',
	'models/user'
], function(_, Backbone, Model) {
	var Collection = Backbone.Collection.extend({
		model: Model,
		url: '/users'
	});
});