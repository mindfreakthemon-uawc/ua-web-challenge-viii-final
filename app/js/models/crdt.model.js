define([
		'backbone',
		'jsdiff'
	],
	(Backbone, jsdiff) => {
		return Backbone.Model.extend({
			initialize() {
				this._A = new Set();
				this._B = new Set();

				this.set('text', '');
			},

			setEditor($editor) {
				this.set('editor', $editor);
			},

			getText() {
				return this.get('editor').text();
			},

			setText(text) {
				this.get('editor').text(text);
			},

			setHtml(html) {
				this.get('editor').html(html);
			},

			merge(text) {
				var _text = this.getText(),
					caret = this.getCurrentCaretPosition(),
					focusOffset = 0,
					length = 0,
					chunks = jsdiff.diffChars(_text, text);

				chunks.forEach(function (change) {
					if (change.added) {
						if (caret.focusOffset >= length) {
							focusOffset += change.count;
						}
					} else if (change.removed) {
						focusOffset -= change.count;
					}

					length += change.count;

					// conflict resolution should be here, but..
				});

				this.setText(text);
				this.setCurrentCaretPosition(caret.focusOffset + focusOffset);
			},

			getCurrentCaretPosition() {
				var caret = window.getSelection();

				return {
					focusOffset: caret.focusOffset
				};
			},

			setCurrentCaretPosition(offset) {
				var el = this.get('editor')[0],
					range = document.createRange(),
					selection = window.getSelection();

				try {
					range.setStart(el.firstChild, offset);
				} catch (e) {
					// no text so just put to start
					range.setStart(el, 0);
				}

				range.collapse(true);

				selection.removeAllRanges();
				selection.addRange(range);
			},

			setPeerCarets(carets) {
				// not done
			}
		});
	})