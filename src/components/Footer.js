import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import theme from '../theme';

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

	const imageCount = showCount ? (
		<div className={css(classes.footerCount)} style={{
			color: theme.footer.count.color,
			fontSize: theme.footer.count.fontSize,
		}}>
			{countCurrent}
			{countSeparator}
			{countTotal}
		</div>)
		: <span />;

	return (
		<div className={css(classes.footer)} {...props} style={{
			color: theme.footer.color,
		}}>
			{caption ? (
				<figcaption className={css(classes.footerCaption)}>
					{caption}
				</figcaption>
			) : <span />}
			{imageCount}
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

const classes = StyleSheet.create({
	footer: {
		boxSizing: 'border-box',
		color: 'white',
		cursor: 'auto',
		display: 'flex',
		height: theme.footer.height,
		justifyContent: 'space-between',
		left: 0,
		lineHeight: 1.3,
		paddingBottom: theme.footer.gutter.vertical,
		paddingLeft: theme.footer.gutter.horizontal,
		paddingRight: theme.footer.gutter.horizontal,
		paddingTop: theme.footer.gutter.vertical,
	},
	footerCount: {
		paddingLeft: '1em', // add a small gutter for the caption
	},
	footerCaption: {
		flex: '1 1 0',
	},
});

module.exports = Footer;
