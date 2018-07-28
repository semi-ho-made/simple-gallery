import React, { Component } from 'react';
import styles from './App.css';
import IMAGES from './data/imageset';
import PhotoGallery from './photogallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.setData_kitties = this.setData_kitties.bind(this);
    this.setData_drawings = this.setData_drawings.bind(this);

    this.state = {
      dataset : IMAGES
    }
  }

  render() {
    let imageSet = {};
    if(this.state.dataset !== null) {
      imageSet = { imageSet: this.state.dataset };
    }
    return (
      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Gallery</h1>
          <p className={styles.nav}>
            <span className={styles.button} onClick={this.setData_kitties}>kitties</span>
            <span className={styles.button} onClick={this.setData_drawings}>drawings</span>
          </p>
        </header>
        <div className={styles.gallerySection}>
          <PhotoGallery {...imageSet} />
        </div>
      </div>
    );
  }

  setData_kitties () {
    this.setState({ dataset: null });
  }
  setData_drawings () {
    this.setState({ dataset: IMAGES });
  }
}

export default App;
