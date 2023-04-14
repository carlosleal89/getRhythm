import PropTypes from 'prop-types';
import React, { Component } from 'react';

class AlbunsList extends Component {
  render() {
    const { img, album, artistName } = this.props;
    return (
      <div>
        <img src={ img } alt={ `Album Name: ${album}` } />
        <p>{ album }</p>
        <p>{ artistName }</p>
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
