define([
	'underscore',
	'backbone',
	'views/user/UserView',	
	'collections/UsersCollection',
	'text!templates/user/usersListTemplate.html'
], function(_, Backbone, UserView, UsersCollection, usersListTemplate) {
	var UsersListView = Backbone.View.extend({
		el: '#content',

		template: _.template(usersListTemplate),

		events: {
			'click .user-item': 'showUser'
		},

		showUser: function(e) {
			var targetEl = this.$(e.target);
			var userItem = targetEl.closest('.user-item');
			var id = userItem.attr('id');
			var userView = new UserView({id: id});
			userView.render();
		},

		render: function() {
			var self = this;
			var users = new UsersCollection();
			users.fetch({
				success: function(users, response, options) {
					// this.$("title").html("ВРокаши - користувачі");
					self.$el.html( self.template({ users: users.toJSON() }) );
				},
				error: function(users, response, options) {
					console.error("UsersList fetch error:", response);
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