// Don't try and apply overflow/padding if the scroll is already blocked
'use strict';

var bodyBlocked = false;

var allowScroll = function allowScroll() {
	if (typeof window === 'undefined' || !bodyBlocked) return;

	//  FIXME iOS ignores overflow on body

	try {
		var target = document.body;

		target.style.paddingRight = '';
		target.style.overflowY = '';

		bodyBlocked = false;
	} catch (err) {
		console.error('Failed to find body element. Err:', err);
	}
};

var blockScroll = function blockScroll() {
	if (typeof window === 'undefined' || bodyBlocked) return;

	//  FIXME iOS ignores overflow on body

	try {
		var scrollBarWidth = window.innerWidth - document.body.clientWidth;

		var target = document.body;

		target.style.paddingRight = scrollBarWidth + 'px';
		target.style.overflowY = 'hidden';

		bodyBlocked = true;
	} catch (err) {
		console.error('Failed to find body element. Err:', err);
	}
};

module.exports = {
	allowScroll: allowScroll,
	blockScroll: blockScroll
};