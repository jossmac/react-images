const CLOSE_SIZE = 20;
const ARROW_HEIGHT = 120;
const GAP_BOTTOM = 50;
const GAP_TOP = 40;

const styles = {
	// SCENE
	container: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		boxSizing: 'border-box',
		height: '100%',
		left: 0,
		padding: '0 10px',
		position: 'fixed',
		textAlign: 'center',
		top: 0,
		width: '100%',
		zIndex: 2001,
	},
	content: {
		display: 'inline-block',
		margin: '0 auto',
		maxWidth: '100%',
		position: 'relative',
		verticalAlign: 'middle',
	},
	contentHeightShim: {
		display: 'inline-block',
		height: '100%',
		lineHeight: 0,
		verticalAlign: 'middle',
	},

	// IMAGES
	image: {
		boxSizing: 'border-box',
		display: 'block',
		lineHeight: 0,
		maxWidth: '100%',
		margin: '0 auto',
		paddingBottom: 50,
		paddingTop: 40,
		height: 'auto',
		width: 'auto',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',

	},
	figure: {
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		lineHeight: 1,
		minHeight: 200,
		minWidth: 300,
		margin: 0,
		textAlign: 'center',
	},
	figureShadow: {
		bottom: GAP_BOTTOM,
		boxShadow: '0 0 8px -2px rgba(0,0,0,.6)',
		display: 'block',
		height: 'auto',
		left: 0,
		position: 'absolute',
		right: 0,
		top: GAP_TOP,
		width: 'auto',
		zIndex: -1,
	},
	footer: {
		color: 'white',
		lineHeight: 1.3,
		height: GAP_BOTTOM,
		marginTop: -GAP_BOTTOM,
		paddingTop: 5,
		position: 'absolute',
		textAlign: 'left',
		top: '100%',
		left: 0,
		width: '100%',
		cursor: 'auto',
	},
	footerCount: {
		float: 'right',
		fontSize: '.85em',
		opacity: 0.75,
	},
	footerCaption: {
		paddingRight: 80,
	},

	// BUTTONS
	arrow: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		marginTop: ARROW_HEIGHT / -2,
		maxWidth: 80,
		padding: 20,
		position: 'absolute',
		top: '50%',
		height: ARROW_HEIGHT,
		width: '16%',
		zIndex: 1001,

		// disable user select
		WebkitTouchCallout: 'none',
		WebkitUserSelect: 'none',
		MozUserSelect: 'none',
		msUserSelect: 'none',
		userSelect: 'none',
	},
	arrowNext: {
		right: 0,
	},
	arrowPrev: {
		left: 0,
	},
	closeBar: {
		height: GAP_TOP,
		left: 0,
		position: 'absolute',
		textAlign: 'right',
		top: 0,
		width: '100%',
	},
	closeButton: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		height: CLOSE_SIZE + 20,
		outline: 'none',
		padding: 10,
		position: 'relative',
		right: -10,
		top: 0,
		verticalAlign: 'bottom',
		width: CLOSE_SIZE + 20,
	},
};

export default styles;
