define([
		'backbone',
		'tmpls'

	],
	function (Backbone, tmpls) {

		return Backbone.View.extend({

			/**
			 * Logs errors. Heh
			 */
			showError: function () {
				console.error.apply(console, arguments);
			},

			/**
			 * Displays loading template inside the view
			 */
			showLoading: function () {
				this.el.innerHTML = tmpls.loading();
			}
		});
	});