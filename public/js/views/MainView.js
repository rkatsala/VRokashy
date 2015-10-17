define([
	'backbone',
	'text!templates/mainTemplate.html'
], function(Backbone, mainTemplate) {
	var MainView = Backbone.View.extend({
		el: '#content',

		template: _.template(mainTemplate),

		render: function() {
			var self = this;
			self.$el.html( self.template() );

			return this;
		}
	});

	return MainView;
});