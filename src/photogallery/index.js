import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

class PhotoGallery extends Component {
	static propTypes = {
		imageSet : PropTypes.array
	}

	static defaultProps = {
		imageSet : [{
			url: 'http://placekitten.com/g/500/400',
			caption: 'yawning'
		},
		{
			url: 'http://placekitten.com/g/520/410',
			caption: 'buttons'
		},
		{
			url: 'http://placekitten.com/g/600/450',
			caption: 'lil tiger'
		}]
	}


	constructor(props) {
		super(props);
		this.slideRight = this.slideRight.bind(this);
		this.slideLeft = this.slideLeft.bind(this);
		this.sliderWidth = 0;

		this.sliderElement = null;

		this.setSlider = element => {
		  this.sliderElement = element;
		}

		this.state = {
		  totalSlides: 0,
		  currentItem: 0
		}
	}

	componentDidMount() {
		/* Set slider width */
		this.setSliderLength();
	}

	componentWillUnmount() {
	}

	render() {
		const { imageSet } = this.props;
		const slider_width = imageSet.length * 100;
		const singleSlide_width = 100/imageSet.length;
		const slider_position = this.state.currentItem * singleSlide_width * -1;

		const slides = imageSet.map((image, index)=>{
			return (
				<figure className={styles.slide} style={{width: `${singleSlide_width}%`}} key={`slide-${index}`}>
					<img src={image.url} className={styles.image} alt='' />
					<figcaption className={styles.caption}>{image.caption}</figcaption>
				</figure>);
		});

		return (
			<div className={styles.gallery}>
				<div ref={this.setSlider} className={styles.slider}>
					<div className={styles.sliderTrack} style={{transform: `translateX(${slider_position}%)`, width: `${slider_width}%`}}>
						{slides}
					</div>
				</div>
				<div className={styles.controls}>
					<span className={styles.buttonPrev} onClick={this.slideLeft}>
						<span className={styles.buttonIcon}></span>
					</span>
					<span className={styles.buttonNext} onClick={this.slideRight}>
						<span className={styles.buttonIcon}></span>
					</span>
				</div>				
			</div>);
	}


	setSliderLength() {
		const numChildren = this.props.imageSet.length || 0;
		const elementInfo = this.sliderElement.getBoundingClientRect();
		this.sliderWidth = elementInfo.width || this.sliderElement.offsetWidth;

		this.setState({
		  totalSlides: numChildren
		})
	}

	slideRight() {
		let nextItem = this.state.currentItem + 1;
		if(nextItem >= this.state.totalSlides) {
			nextItem = 0;
		}
		this.setState({
  		  currentItem: nextItem
		})
	}

	slideLeft() {
		let nextItem = this.state.currentItem - 1;
		if(nextItem < 0) {
			nextItem = this.state.totalSlides - 1;
		}
		this.setState({
  		  currentItem: nextItem
		})
	}
}

export default PhotoGallery;