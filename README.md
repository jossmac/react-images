# React Images

A simple, responsive lightbox component for displaying an array of images

### Options

	Property			|	Type		|	Description
:-----------------------|:--------------|:--------------------------------
	backdropClosesModal	|	bool		|	Allow users to exit the lightbox by clicking the backdrop
	enableKeyboardInput	|	bool		|	Supports keyboard input - `esc`, `arrow left`, and `arrow right`
	initialImage		|	number		|	The index of the first image to display
	height				|	number		|	Maximum height of the carousel; defaults to 600px
	images				|	array		|	An array of image `url`s
	isOpen				|	bool		|	Whether or not the lightbox is displayed
	onClose			|	func		|	Handle closing of the lightbox
	showCloseButton		|	bool		|	Optionally display a close button under the carousel
	width				|	number		|	Maximum width of the carousel; defaults to 900px
