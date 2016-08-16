import theme from '../theme';

const styles = {
	container: {
		alignItems: 'center',
		backgroundColor: theme.container.background,
		boxSizing: 'border-box',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		left: 0,
		paddingBottom: theme.container.gutter.vertical,
		paddingLeft: theme.container.gutter.horizontal,
		paddingRight: theme.container.gutter.horizontal,
		paddingTop: theme.container.gutter.vertical,
		position: 'fixed',
		top: 0,
		width: '100%',
		zIndex: theme.container.zIndex,
	},

	content: {
		position: 'relative',
	},

	// IMAGES
	image: {
		display: 'block', // removes browser default gutter beneath
		height: 'auto',
		margin: '0 auto', // maintain center on very short screens OR very narrow image
		maxWidth: '100%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',

	},
	figure: {
		// minHeight: 200,
		// minWidth: 300,
		margin: 0, // remove browser default
	},
};

export default styles;
