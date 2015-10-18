define([
	'backbone',
	'text!templates/navbarTemplate.html'
], function(Backbone, navbarTemplate) {
	var NavbarView = Backbone.View.extend({
		el: '#navbar',

		template: _.template(navbarTemplate),

		render: function() {
			var self = this;
			this.$el.html( self.template() );

			return this;
		}
	});

	return NavbarView;
});