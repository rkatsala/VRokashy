define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	var Model = Backbone.Model.extend({
		idAttribute: '_id',
		urlRoot: '/users'
	});

	return Model;
});