define([
	'underscore',
	'backbone',
	'views/user',	
	'collections/users',
	'text!templates/users.html',
	'models/user'
], function(_, Backbone, UserView, UsersCollection, usersTemplate, UserModel) {
	var UsersListView = Backbone.View.extend({
		el: '#content',

		template: _.template(usersTemplate),

		events: {
			'click .user-item': 'showUser'
		},

		showUser: function(e) {
			var targetEl = this.$(e.target);
			var userItem = targetEl.closest('.user-item');
			var id = userItem.attr('id');
			var user = new UserModel({_id: id});
			
			user.fetch({
				success: function(user) {
					var userView = new UserView({model: user});
					userView.render();
				},
				error: function(user, response) {
					console.error(response)
				}
			});
		},

		render: function() {
			var self = this;
			var users = new UsersCollection();
			users.fetch({
				success: function(users, response, options) {
					this.$("title").html("ВРокаши - користувачі");
					self.$el.html( self.template({ users: users.toJSON() }) );
				},
				error: function(users, response, options) {
					console.error("UsersListView error:", response)
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