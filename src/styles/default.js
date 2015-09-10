const styles = {
	arrow: {
		background: 'none',
		border: 'none',
		bottom: 0,
		color: 'white',
		cursor: 'pointer',
		fontSize: 48,
		right: 0,
		outline: 'none',
		padding: '0 2%',
		position: 'absolute',
		top: 0,
		width: '10%',
		zIndex: 1002,

		// disable user select
		WebkitTouchCallout: 'none',
		WebkitUserSelect:   'none',
		MozUserSelect:      'none',
		msUserSelect:       'none',
		userSelect:         'none',
	},
	arrowNext: {
		right: 0,
	},
	arrowPrev: {
		left: 0,
	},
	backdrop: {
		backgroundColor: 'rgba(0,0,0,0.66)',
		bottom: 0,
		left: 0,
		position: 'fixed',
		right: 0,
		top: 0,
		zIndex: 1000,
	},
	close: {
		background: 'none',
		border: 'none',
		bottom: -32,
		color: 'white',
		cursor: 'pointer',
		fontSize: 16,
		height: 32,
		left: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		outline: 'none',
		padding: 0,
		position: 'absolute',
		right: 0,
		textAlign: 'center',
		textTransform: 'uppercase',
		width: 100,
	},
	dialog: {
		left: 0,
		lineHeight: 1,
		marginLeft: 'auto',
		marginRight: 'auto',
		maxHeight: '80%',
		maxWidth: '100%',
		position: 'fixed',
		right: 0,
		top: '50%',
		zIndex: 1001,

		WebkitTransform: 'translateY(-50%)',
		MozTransform:    'translateY(-50%)',
		msTransform:     'translateY(-50%)',
		transform:       'translateY(-50%)',
	},
	image: {
		boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
		maxHeight: '100%',
		maxWidth: '80%',
		position: 'absolute',

		// center the image within the dialog
		left: '50%',
		top: '50%',
		WebkitTransform: 'translate(-50%, -50%)',
		MozTransform:    'translate(-50%, -50%)',
		msTransform:     'translate(-50%, -50%)',
		transform:       'translate(-50%, -50%)',

		// disable user select
		WebkitTouchCallout: 'none',
		WebkitUserSelect:   'none',
		MozUserSelect:      'none',
		msUserSelect:       'none',
		userSelect:         'none',

	},
};

export default styles;
