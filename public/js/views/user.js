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
			var self = this;
			this.$el.html( self.template({ user: self.model.toJSON() }) );
			Backbone.history.navigate(self.model.url());
			/*var self = this;
			var user = this.model;
			user.fetch({
				success: function(user) {
					// this.$("title").html(user.name.full + " - ВРокаши");
					self.$el.html( self.template({ user: user.toJSON() }) );
				},
				error: function(user, response) {
					console.error("UserView error:", response);
				}
			});*/

			return this;
		}
	});

	return UserView;

});