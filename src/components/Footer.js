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
	customFooter,
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

	const defaultFooter = (
		<div className={css(classes.footer)} {...props}>
			{caption ? (
				<figcaption className={css(classes.footerCaption)}>
					{caption}
				</figcaption>
			) : <span />}
			{imageCount}
		</div>
	);

	return (customFooter ? customFooter : defaultFooter);
}

Footer.propTypes = {
	caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	countCurrent: PropTypes.number,
	countSeparator: PropTypes.string,
	countTotal: PropTypes.number,
	customFooter: PropTypes.node,
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
		display: 'flex',
		justifyContent: 'space-between',
		left: 0,
		lineHeight: 1.3,
		paddingBottom: defaults.footer.gutter.vertical,
		paddingLeft: defaults.footer.gutter.horizontal,
		paddingRight: defaults.footer.gutter.horizontal,
		paddingTop: defaults.footer.gutter.vertical,
	},
	footerCount: {
		color: defaults.footer.count.color,
		fontSize: defaults.footer.count.fontSize,
		paddingLeft: '1em', // add a small gutter for the caption
	},
	footerCaption: {
		flex: '1 1 0',
	},
};

export default Footer;
