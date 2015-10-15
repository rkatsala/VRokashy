define([
	'underscore',
	'backbone',
	'models/user',
	'text!templates/user.html'
], function(_, Backbone, UserModel, userTemlate) {
	var UserView = Backbone.View.extend({
		el: '#content',

		template: _.template(userTemlate),

		render: function(uid) {
			var self = this;
			var user = new UserModel({id: uid});
			user.fetch({
				success: function(user) {
					this.$("title").html(user.name.full + " - ВРокаши");
					self.$el.html( self.template({ user: user.toJSON() }) );
				},
				error: function(user, response) {
					console.error("UserView error!", response);
				}
			});

			return this;
		}
	});

	return UserView;

});