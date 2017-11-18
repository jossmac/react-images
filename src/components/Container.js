import glamorous from 'glamorous';

export default glamorous.div({
	alignItems: 'center',
	boxSizing: 'border-box',
	display: 'flex',
	height: '100%',
	justifyContent: 'center',
	left: 0,
	position: 'fixed',
	top: 0,
	width: '100%',
}, ({ theme }) => ({
	backgroundColor: theme.container.background,
	paddingBottom: theme.container.gutter.vertical,
	paddingLeft: theme.container.gutter.horizontal,
	paddingRight: theme.container.gutter.horizontal,
	paddingTop: theme.container.gutter.vertical,
	zIndex: theme.container.zIndex,
}));
