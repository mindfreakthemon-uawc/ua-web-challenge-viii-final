window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;

require({
	baseUrl: '/js',
	paths: {
		jquery: '../lib/jquery/dist/jquery.min',
		underscore: '../lib/underscore/underscore-min',
		backbone: '../lib/backbone/backbone',
		jade: '../lib/jade/runtime',
		jsdiff: '../lib/jsdiff/diff.min',
		//skylink: 'https://cdn.temasys.com.sg/skylink/skylinkjs/0.6.x/skylink.complete.min',
		templates: '../templates'
	}
}, [
	'views/app.view'
], function (AppView) {
	var appView = new AppView();

	appView.render();
});