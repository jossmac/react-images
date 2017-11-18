import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

export default function Footer ({
	caption,
	countCurrent,
	countSeparator,
	countTotal,
	showCount,
	...props,
}) {
	if (!caption && !showCount) return null;

	const imageCount = showCount ? (
		<Count>
			{countCurrent}
			{countSeparator}
			{countTotal}
		</Count>)
		: <span />;

	return (
		<Wrapper {...props}>
			{caption ? (
				<Caption>
					{caption}
				</Caption>
			) : <span />}
			{imageCount}
		</Wrapper>
	);
}

Footer.propTypes = {
	caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	countCurrent: PropTypes.number,
	countSeparator: PropTypes.string,
	countTotal: PropTypes.number,
	showCount: PropTypes.bool,
};

const	Wrapper = glamorous.div({
	boxSizing: 'border-box',
	cursor: 'auto',
	display: 'flex',
	justifyContent: 'space-between',
	left: 0,
	lineHeight: 1.3,
}, ({ theme }) => ({
	color: theme.footer.color,
	paddingBottom: theme.footer.gutter.vertical,
	paddingLeft: theme.footer.gutter.horizontal,
	paddingRight: theme.footer.gutter.horizontal,
	paddingTop: theme.footer.gutter.vertical,
}));

const	Count = glamorous.div({
	paddingLeft: '1em', // add a small gutter for the caption
}, ({ theme }) => ({
	color: theme.footer.count.color,
	fontSize: theme.footer.count.fontSize,
}));

const	Caption = glamorous.figcaption({
	flex: '1 1 0',
});
