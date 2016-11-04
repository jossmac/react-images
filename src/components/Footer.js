import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import defaults from '../theme';
import { deepMerge } from '../utils';
import Container from './Container';

function Footer ({
	caption,
	countCurrent,
	countSeparator,
	countTotal,
	showCount,
	visible,
	...props,
}, {
	theme,
}) {
	if (!caption && !showCount) return null;

	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	const imageCount = showCount ? (
		<div className={css(classes.count)}>
			{countCurrent}
			{countSeparator}
			{countTotal}
		</div>)
		: <span />;

	return (
		<div className={css(classes.footer, visible ? classes.visible : null)} {...props}>
			<Container>
				{caption ? (
					<figcaption className={css(classes.caption)}>
						{caption}
					</figcaption>
				) : <span />}
				{imageCount}
			</Container>
		</div>
	);
};

Footer.propTypes = {
	caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	countCurrent: PropTypes.number,
	countSeparator: PropTypes.string,
	countTotal: PropTypes.number,
	showCount: PropTypes.bool,
};
Footer.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	footer: {
		background: 'linear-gradient(to bottom, hsla(0, 0%, 10%, 0) 0%, hsla(0, 0%, 8%, 0.9) 100%)',
		bottom: 0,
		color: defaults.footer.color,
		cursor: 'auto',
		left: 0,
		lineHeight: 1.3,
		opacity: 0,
		position: 'absolute',
		right: 0,
		transition: 'all 150ms',
		transform: 'translateY(10px)',
		visibility: 'hidden',
	},
	visible: {
		opacity: 1,
		transform: 'translateY(0)',
		visibility: 'visible',
	},
	count: {
		color: defaults.footer.count.color,
		fontSize: defaults.footer.count.fontSize,
		paddingLeft: '1em', // add a small gutter for the caption
	},
	caption: {
		flex: '1 1 0',
	},
};

module.exports = Footer;
