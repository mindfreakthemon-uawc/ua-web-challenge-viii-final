define([
		'jquery',
		'templates',
		'underscore'
	],
	function ($, templates, _) {
		Object.keys(templates)
			.forEach(function (key) {
				var fn = templates[key];

				templates[key] = function (locals) {
					return fn($.extend({
						_: _
					}, locals));
				};
			});


		return templates;
	});