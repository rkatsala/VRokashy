define([
	'underscore',
	'backbone',
	'models/UserModel',
	'text!templates/user/userTemplate.html'
], function(_, Backbone, UserModel, userTemplate) {
	var UserView = Backbone.View.extend({
		el: '#content',

		template: _.template(userTemplate),

		render: function() {
			/*var self = this;
			this.$el.html( self.template({ user: self.model.toJSON() }) );*/
			var self = this;
			var user = new UserModel({_id: self.id});
			user.fetch({
				success: function(user) {
					// this.$("title").html(user.name.full + " - ВРокаши");
					self.$el.html( self.template({ user: user.toJSON() }) );
					Backbone.history.navigate(user.url());
				},
				error: function(user, response) {
					console.error("User fetch error:", response);
				}
			});

			return this;
		}
	});

	return UserView;

});