define([
	'jquery',
	'underscore',
	'backbone',
	'collection/users',
	'text!templates/users.html'
], function($, _, Backbone, UsersCollection, usersTemplate) {
	var View = Backbone.View.extend({
		el: '#content',
		render: function() {
			var that = this;
			var users = new UsersCollection();
			users.fetch({
				success: function(users) {
					that.$el.html(_.template(usersTemplate, {users: users.models}))
				}
			});
		}
		/*template: _.template(userTemplate),

		events: {},

		initialize: function(options) {
			this.render(options);
		},

		render: function(options) {
			var collection = options.collection.toJSON();
			this.$el.html( this.template({ users: collection }) );

			return this;
		}*/
	});

	return View;
});