define([
	'underscore',
	'backbone',
	'models/user',
	'text!templates/user.html'
], function(_, Backbone, UserModel, userTemlate) {
	var UserView = Backbone.View.extend({
		el: '#content',

		template: _.template(userTemlate),

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