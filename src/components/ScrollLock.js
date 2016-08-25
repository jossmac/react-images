import React, { Component } from 'react';

let lockCount = 0;

export default class ScrollLock extends Component {

	componentWillMount () {
		if (typeof window === 'undefined') return;

		lockCount++;
		if (lockCount > 1) return;

		//	FIXME iOS ignores overflow on body
		try {
			const scrollBarWidth = window.innerWidth - document.body.clientWidth;

			const target = document.body;

			target.style.paddingRight = scrollBarWidth + 'px';
			target.style.overflowY = 'hidden';
		} catch (err) {
			console.error('Failed to find body element. Err:', err);
		}
	}

	componentWillUnmount () {
		if (typeof window === 'undefined' || lockCount === 0) return;

		lockCount--;
		if (lockCount > 0) return; // Still locked

		//	FIXME iOS ignores overflow on body
		try {
			const target = document.body;

			target.style.paddingRight = '';
			target.style.overflowY = '';

		} catch (err) {
			console.error('Failed to find body element. Err:', err);
		}
	}

	render () {
		return null;
	}
}
