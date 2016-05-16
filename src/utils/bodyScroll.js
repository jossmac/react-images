// Don't try and apply overflow/padding if the scroll is already blocked
let bodyBlocked = false;

const allowScroll = function () {
	if (typeof window === 'undefined' || !bodyBlocked) return;

	//  FIXME iOS ignores overflow on body

	try {
		const target = document.body;

		target.style.paddingRight = '';
		target.style.overflowY = '';

		bodyBlocked = false;
	} catch (err) {
		console.error('Failed to find body element. Err:', err);
	}
};

const blockScroll = function () {
	if (typeof window === 'undefined' || bodyBlocked) return;

	//  FIXME iOS ignores overflow on body

	try {
		const scrollBarWidth = window.innerWidth - document.body.clientWidth;

		const target = document.body;

		target.style.paddingRight = scrollBarWidth + 'px';
		target.style.overflowY = 'hidden';

		bodyBlocked = true;
	} catch (err) {
		console.error('Failed to find body element. Err:', err);
	}
};

module.exports = {
	allowScroll,
	blockScroll,
};
