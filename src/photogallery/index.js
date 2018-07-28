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
		this.touchStart = this.touchStart.bind(this);
		this.touchStop = this.touchStop.bind(this);
		this.startDrag = this.startDrag.bind(this);
		this.stopDrag = this.stopDrag.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);

		this.sliderElement = null;

		this.setSlider = element => {
		  this.sliderElement = element;
		}

		this.state = {
			totalSlides: 0,
			currentItem: 0,
			startDragPos: 0,
			movePos: 0,
			moveDistance: 0,
			isDragging: false
		}
	}

	componentDidMount() {
		/* Set slider width */
		this.setTrackWidth();
	}

	componentDidUpdate(prevProps) {
		if(this.props.imageSet !== prevProps.imageSet) {
			this.setTrackWidth();
			this.setState({ currentItem: 0 })
		}
	}

	render() {
		const { imageSet } = this.props;

		const slider_width = imageSet.length * 100;
		const singleSlide_width = 100/imageSet.length;
		const slider_position = this.state.currentItem * singleSlide_width * -1;

		const slides = imageSet.map((image, index)=>{
			let selectedSlide = false;
			if(index === this.state.currentItem) {
				selectedSlide = true;
			}
			return (
				<figure className={styles.slide} data-selected={selectedSlide} style={{width: `${singleSlide_width}%`}} key={`slide-${index}`}>
					<div className={styles.slideContent}>
						<img src={image.url} className={styles.image} alt='' />
						<figcaption className={styles.caption}>{image.caption}</figcaption>
					</div>
				</figure>);
		});

		return (
			<div className={styles.gallery} onMouseUp={this.stopDrag} onMouseDown={this.startDrag} onMouseMove={this.onMouseMove} onTouchStart={this.touchStart} onTouchEnd={this.touchStop}>
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


	setTrackWidth() {
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


	getMousePosition(e) {
		e = e || window.event;
		let pageX = e.pageX;
		if (pageX === undefined) {
			pageX = (e.clientX || (e.targetTouches && e.targetTouches[0] && e.targetTouches[0].clientX) || 0);
			pageX += document.body.scrollLeft + document.documentElement.scrollLeft;
		}
		return pageX;    
	}

	onMouseMove(event) {
		if(!this.state.isDragging) { return }

		const dragPos = this.getMousePosition(event);
		const moveDistance = this.state.moveDistance + (dragPos - this.state.movePos);

		this.setState({
			movePos: dragPos,
			moveDistance: moveDistance
		})
	}

	startDrag(event) {
		const currentPos = this.getMousePosition(event);

		this.setState({ 
			startDragPos: currentPos,
			movePos: currentPos,
			isDragging: true
		});
	}

	stopDrag(event) {
		const directionChange = (this.state.startDragPos - this.state.movePos);

		if(directionChange > 0) {
			this.slideRight();
		} else if(directionChange < 0) {
			this.slideLeft();
		} else {
			this.setState({ isDragging: false });
		}
	}

	touchStart(event) {
		event.preventDefault();
		this.startDrag(event);
	}

	touchStop(event) {
		event.preventDefault();
		this.stopDrag(event);
	}
}

export default PhotoGallery;