define([
	'backbone',
	'models/LogoutModel',
	'text!templates/navbarTemplate.html',
	'cookies'
], function(Backbone, LogoutModel, navbarTemplate, Cookies) {
	var NavbarView = Backbone.View.extend({
		el: '#navbar',

		template: _.template(navbarTemplate),

		events: {
			'click #logout-href': 'logout'
		},

		logout: function(e) {
			var self = this;
			var logout = new LogoutModel();
			logout.save({isNew: true}, {
				success: function(logout, response, options) {
					Cookies.remove('userId');
					Cookies.remove('isAdmin');
				},
				error: function(logout, xhr, options) {
					console.error("Logout error", xhr);
					alert("Помилка виходу!");
				}
			});
		},

		render: function() {
			var self = this;
			var userId = Cookies.get('userId');
			this.$el.html( self.template({ userId: userId }) );

			return this;
		}
	});

	return NavbarView;
});