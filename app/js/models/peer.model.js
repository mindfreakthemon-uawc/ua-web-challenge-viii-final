define(['backbone'], function (Backbone) {
	function getRandomColor() {
		var i,
			letters = '0123456789ABCDEF'.split(''),
			l = letters.length,
			color = '#';

		for (i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * l)];
		}

		return color;
	}

	return Backbone.Model.extend({
		defaults: {
			caret: {
				focusOffset: 0
			}
		},

		initialize: function () {
			this.set('color', getRandomColor())
		}
	});
})