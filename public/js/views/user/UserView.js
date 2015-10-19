define([
	'underscore',
	'backbone',
	'models/UserModel',
	'text!templates/user/userTemplate.html'
], function(_, Backbone, UserModel, userTemplate) {
	var UserView = Backbone.View.extend({
		el: '#content',

		template: _.template(userTemplate),

		events: {
			'click #add-post-btn': 'addPost'
		},

		addPost: function(e) {
			var self = this;
			var data = self.$el.find('#add-post').val();
			var url = '/users/' + self.id + '/posts';
			var PostModel = Backbone.Model.extend({
				idAttribute: '_id',
				urlRoot: function() {
					return url;
				}
			});
			var post = new PostModel();

			post.save({body: data}, {
				success: function(post, response, options) {
					self.render();
				},
				error: function(post, xhr, options) {
					console.error("Add post error", xhr);
					alert("Помилка додавання поста");
				}
			});
		},

		render: function() {
			var self = this;
			var user = new UserModel({_id: self.id});
			user.fetch({
				success: function(user, response, options) {
					// this.$("title").html(user.name.full + " - ВРокаши");
					self.$el.html( self.template({ user: user.toJSON() }) );
					Backbone.history.navigate(user.url());
				},
				error: function(user, response, options) {
					console.error("User fetch error:", response);
				}
			});

			return this;
		}
	});

	return UserView;

});