define([
		'backbone',
		'models/peer.model'
	],
	(Backbone, Peer) => {
		return Backbone.Collection.extend({
			model: Peer
		});
	})