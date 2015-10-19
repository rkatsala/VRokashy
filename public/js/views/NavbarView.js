define([
	'backbone',
	'models/LogoutModel',
	'text!templates/navbarTemplate.html'
], function(Backbone, LogoutModel, navbarTemplate) {
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
					// var userView = new UserView({id: response._id});
					// userView.render();
					Backbone.history.navigate('/', {trigger: true});
				},
				error: function(logout, xhr, options) {
					console.error("Logout error", xhr);
					alert("Помилка виходу!");
				}
			});
		},

		render: function() {
			var self = this;
			this.$el.html( self.template() );

			return this;
		}
	});

	return NavbarView;
});