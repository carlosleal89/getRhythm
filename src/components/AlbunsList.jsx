import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/AlbunsList.css';

class AlbunsList extends Component {
  render() {
    const { img, album, artistName } = this.props;
    return (
      <div className="album-card">
        <img src={ img } alt={ `Album Name: ${album}` } id='album-img'/>
        <div className='album-info-container'>
          <p id='album-name'>{ album }</p>
          <p id='artist-name'>{ artistName }</p>
        </div>
      </div>
    );
  }
}

AlbunsList.propTypes = {
  album: PropTypes.string,
  artistName: PropTypes.string,
  img: PropTypes.string,
}.isRequired;

export default AlbunsList;
