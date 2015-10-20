define([
	'backbone',
	'models/LoginModel',
	'models/UserModel',
	'views/user/UserView',
	'text!templates/mainTemplate.html'
], function(Backbone, LoginModel, UserModel, UserView, mainTemplate) {
	var MainView = Backbone.View.extend({
		el: '#content',

		template: _.template(mainTemplate),

		events: {
			'click #loginBtn': 'login',
			'click #signUpBtn': 'signUp'
		},

		login: function(e) {
			var self = this;
			var data = {
				email: self.$el.find('.login .email').val(),
				password: self.$el.find('.login .password').val()
			};
			var login = new LoginModel(data);
			login.save({isNew: true}, {
				success: function(login, response, options) {
					var userView = new UserView({id: response._id});
					userView.render();
				},
				error: function(login, xhr, options) {
					console.error("Login error", xhr);
					alert("Помилка входу!");
				}
			});
		},

		signUp: function(e) {
			var self = this;
			var $thisEl = this.$el;
			var data = {
				name: {
					first: $thisEl.find('.signUp .name-first').val(),
					last: $thisEl.find('.signUp .name-last').val()
				},
				email: $thisEl.find('.signUp .email').val(),
				password: $thisEl.find('.signUp .password').val()
			};
			var userModel = new UserModel(data);
			userModel.save({}, {
				success: function(userModel, response, options) {
					var userView = new UserView({id: response._id});
					userView.render();
				},
				error: function(userModel, xhr, options) {
					console.error("SignUp error", xhr);
					alert("Помилка реєстрації");
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