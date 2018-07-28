import React, { Component } from 'react';
import styles from './App.css';
import IMAGES from './data/imageset';
import PhotoGallery from './photogallery';

class App extends Component {
  render() {
    return (
      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Gallery</h1>
        </header>
        <p className={styles.intro}>
        </p>
        <PhotoGallery imageSet={IMAGES} />
      </div>
    );
  }
}

export default App;
