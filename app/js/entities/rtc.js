define([], () => {
	var skylink = new Skylink();

	skylink.init('eea73a4c-2036-4a33-9a91-fad141bdae6f', function () {
		skylink.joinRoom('uawc-docs');
	});

	return skylink;
});