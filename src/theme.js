// ==============================
// THEME
// ==============================

const theme = {};

// common
theme.common = {
	gutter: {
		horizontal: 20,
		vertical: 20,
	},
};

// wrapper
theme.wrapper = {
	background: 'hsla(0, 0%, 8%, 0.9)',
	gutter: {
		horizontal: 0,
		vertical: 0,
	},
	zIndex: 2001,
};

// header
theme.header = {
	color: 'white',
};
theme.close = {
	fill: 'white',
	height: 20,
	width: 20,
};

// footer
theme.footer = {
	color: 'white',
	count: {
		color: 'rgba(255, 255, 255, 0.75)',
		fontSize: '0.85em',
	},
};

// thumbnails
theme.thumbnail = {
	activeBorderColor: 'white',
	size: 50,
	gutter: 2,
};

// arrow
theme.arrow = {
	background: 'black',
	fill: 'white',
	height: 120,
};


module.exports = theme;
