// ==============================
// THEME
// ==============================

const theme = {};

// container
theme.container = {
	background: 'rgba(0, 0, 0, 0.8)',
	gutter: {
		horizontal: 10,
		vertical: 0,
	},
	zIndex: 2001,
};

// header
theme.header = {
	height: 40,
};
theme.close = {
	height: 20,
	width: 20,
};

// footer
theme.footer = {
	count: {
		color: 'rgba(255, 255, 255, 0.75)',
		fontSize: '0.85em',
	},
	height: 40,
	gutter: {
		horizontal: 0,
		vertical: 5,
	},
};

theme.thumbnails = {
	height: 64,
	size: 64,
}

// arrow
theme.arrow = {
	height: 120,
};


module.exports = theme;
