import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import defaults from '../theme';
import deepMerge from '../utils/deepMerge';

function Footer ({
	caption,
	countCurrent,
	countSeparator,
	countTotal,
	showCount,
	...props,
}, {
	theme,
}) {
	if (!caption && !showCount) return null;

	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	const imageCount = showCount ? (
		<div className={css(classes.footerCount)}>
			{countCurrent}
			{countSeparator}
			{countTotal}
		</div>)
		: <span />;

	return (
		<div className={css(classes.footer)} {...props}>
			{caption ? (
				<figcaption className={css(classes.footerCaption)}>
					{caption}
				</figcaption>
			) : <span />}
			{imageCount}
		</div>
	);
}

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
		boxSizing: 'border-box',
		color: defaults.footer.color,
		cursor: 'auto',
		lineHeight: 1.3,
		paddingBottom: defaults.footer.gutter.vertical,
		paddingLeft: defaults.footer.gutter.horizontal,
		paddingRight: defaults.footer.gutter.horizontal,
		paddingTop: defaults.footer.gutter.vertical,
	},
	footerCount: {
		float: 'right',
		color: defaults.footer.count.color,
		fontSize: defaults.footer.count.fontSize,
		paddingLeft: '1em', // add a small gutter for the caption
	},
	footerCaption: {
		flex: '1 1 0',
		position: 'absolute',
		left: '0',
		bottom: '40px',
		width: '100%',
		padding: '10px',
		backgroundColor: 'rgba(0,0,0,0.7)',
		boxSizing: 'border-box',
		fontWeight: '300',
		fontSize: '13px',
		lineHeight: '18px',
		color: '#fff',
		fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
	},
};

export default Footer;
