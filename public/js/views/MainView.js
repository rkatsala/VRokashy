define([
	'backbone',
	'models/UserModel',
	'models/LoginModel',
	'text!templates/mainTemplate.html'
], function(Backbone, UserModel, LoginModel, mainTemplate) {
	var MainView = Backbone.View.extend({
		el: '#content',

		template: _.template(mainTemplate),

		events: {
			'click #loginBtn': 'login',
			'click #signUpBtn': 'signUp'
		},

		// not work
		login: function(e) {
			var self = this;
			var data = {
				email: self.$el.find('.login .email').val(),
				password: self.$el.find('.login .password').val()
			}
			var login = new LoginModel(data);
			login.save({}, {
				success: function(login, response) {
					alert("ok");
					// alert(login.email + " " + login.password + "/n " + response);
					// var user = new UserModel(response);
					// Backbone.history.navigate(user.url(), {trigger: true});
				},
				error: function(login, xhr) {
					console.error("Login error:", xhr);
				}
			});
		},

		render: function() {
			var self = this;
			self.$el.html( self.template() );

			return this;
		}
	});

	return MainView;
});