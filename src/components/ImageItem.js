import React, { Component, PropTypes } from 'react';


export default class ImageItem extends Component {
	
	constructor(props) {
		super(props);

		// initiaing state
		this.state = {
			imageSource: props.initialImage || this.props.src,
			width: props.initialImage?'100vw':this.props.style.width,
			srcset: props.initialImage?null:this.props.srcset,
		}

	}

	componentDidMount() {
		// creating image object
		this.lightboxImage = new window.Image();
		// setting display image
		if(this.props.initialImage) this.setDisplayImage(this.props);
	}
	componentWillReceiveProps (nextProps) {
		this.setState({
			imageSource: nextProps.initialImage ||  nextProps.src,
			width: nextProps.initialImage?'100vw': nextProps.style.width,
			srcset: nextProps.initialImage?null: nextProps.srcset,
		});
		console.dir(nextProps)
		if(nextProps.initialImage)  this.setDisplayImage(nextProps)
	}
	componentWillUnmount() {
		// removing image object
		this.lightboxImage.onerror = null;
		this.lightboxImage.onload = null;
		this.lightboxImage = null;
	}
	setDisplayImage({src:image, srcset}) {
		// feeding the img object the main image
		this.lightboxImage.src = image
		// getting passed width
		const width = this.props.style.width


		//  initializing new state
		const newState = {
				imageSource: image,
				width,
			}
		
		// if we have srcset we'll pass it
		if(srcset){
			newState.srcset = srcset
		}

		// TODO getting fallback in case of errors
		this.lightboxImage.onload = () => {
			// updating image when image is available

			this.setState(newState);
		};
	}

	render(){
		// getting image props

		const width = this.state.width;
		const imageProps ={
				alt:this.props.alt,
				className:this.props.className,
				onClick:this.props.onClick,
				sizes:this.props.sizes,
				style:({...this.props.style, width}),
			    src:this.state.imageSource		    
		}
		// put back srclist
		if(this.state.srcSet){
			imageProps.srcSet = this.state.srcSet
		}
		// rendering image
		return (
				<img
				{...imageProps}
			    />
		);
	}
}