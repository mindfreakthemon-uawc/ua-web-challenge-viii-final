define([
		'views/base.view',
		'tmpls',

		'collections/peers.collection',
		'models/crdt.model',

		'entities/rtc'
	],
	function (BaseView, tmpls, PeersCollection, CRDT, rtc) {

		return BaseView.extend({
			template: tmpls.editable,

			className: 'main-page',

			events: {
				'input #name': '_changeName',
				'input #editor': '_input',
				'cut #editor': '_wrappedInput',

				'click #enable-autotype': '_enableAutotype',
				'click #disable-autotype': '_disableAutotype'
			},

			el: '#application',

			initialize() {
				this._peers = new PeersCollection();
				this._crdt = new CRDT();

				this.listenTo(rtc, 'peerJoined', this._onPeerJoin.bind(this));
				this.listenTo(rtc, 'peerLeft', this._onPeerLeft.bind(this));
				this.listenTo(rtc, 'peerUpdated', this._onPeerUpdate.bind(this));
				this.listenTo(rtc, 'incomingMessage', this._onIncomingMessage.bind(this));

				this.listenTo(this._peers, 'add remove change', this.renderPeers.bind(this));
			},

			render() {
				if (this._ready) {
					this.el.innerHTML = this.template();
				} else {
					this.showLoading();
				}

				this._crdt.setEditor(this.$('#editor'));

				this.$('#name').val(this._peerId);

				return this;
			},

			renderPeers() {
				this.$('#peers').html(tmpls.peers({
					peers: this._peers,
					peerId: this._peerId
				}));

				// update all other carets
				this._crdt.setPeerCarets(this._peers
					.filter(peer => peer.id !== this._peerId)
					.map(peer => ({
						focusOffset: peer.get('caret').focusOffset,
						color: peer.get('color')
					}))
				);
			},

			/* rtc events */

			_onPeerJoin(peerId, peerInfo, isSelf) {
				this._peers.add({
					id: peerId,
					name: peerInfo.userData.name || peerId
				});

				if (isSelf) {
					this._peerId = peerId;
					this._ready = true;
					this.render();
				}
			},

			_onPeerLeft(peerId, peerInfo, isSelf) {
				if (isSelf) {
					return;
				}

				this._peers.remove(peerId);
			},

			_onPeerUpdate(peerId, peerInfo, isSelf) {
				this._peers.add({
					id: peerId,
					name: peerInfo.userData.name || peerId
				}, { merge: true });
			},

			_onIncomingMessage(message, peerId, peerInfo, isSelf) {
				if (isSelf) {
					return;
				}

				this._peers.get(peerId).set('caret', message.content.caret);
				this._crdt.merge(message.content.input);
			},

			/* events */

			_changeName(e) {
				rtc.setUserData({
					name: e.target.value
				});
			},

			_input(e) {
				var caret = this._crdt.getCurrentCaretPosition();

				this._peers.get(this._peerId).set('caret', caret);
				this._crdt.merge(e.target.innerText);

				rtc.sendP2PMessage({
					input: e.target.innerText,
					caret: caret
				});
			},

			_wrappedInput(e) {
				setTimeout(() => this._input(e), 10);
			},

			_autotype: null,

			_enableAutotype() {
				if (this._autotype) {
					this._disableAutotype();
				}

				this._autotype = setInterval(() => {
					this.$('#editor').append('text ').trigger('input');
				});
			},

			_disableAutotype() {
				clearInterval(this._autotype);
			}
		});
	});