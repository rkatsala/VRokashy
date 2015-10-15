define([
	'underscore',
	'backbone',	
	'collections/users',
	'text!templates/users.html'
], function(_, Backbone, UsersCollection, usersTemplate) {
	var UsersListView = Backbone.View.extend({
		el: '#content',

		template: _.template(usersTemplate),

		render: function() {
			var self = this;
			var users = new UsersCollection();
			users.fetch({
				success: function(users, response, options) {
					this.$("title").html("ВРокаши - користувачі");
					self.$el.html( self.template({ users: users.toJSON() }) );
				},
				error: function(users, response, options) {
					console.error(response, "UsersListView error!")
				}
			});
			return this;
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

	return UsersListView;
});