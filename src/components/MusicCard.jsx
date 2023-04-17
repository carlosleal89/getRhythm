import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  componentDidMount() {
    this.handleChange();
  }

  handleFavorite() {
    const { track, favoriteSongs } = this.props;
    const trackIds = favoriteSongs.map((el) => el.trackId);
    if (trackIds.includes(track.trackId)) {
      this.setState({
        isFavorite: true,
      });
      console.log(this.state);
    }
  }

  handleChange = async ({ target }) => {
    // const { name } = target;
    const { track } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        isLoading: true,
        isFavorite: value,
      },
      this.handleFavorite,
    );
    if (target.checked === true) {
      await addSong(track);
    } else {
      await removeSong(track);
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isFavorite } = this.state;
    // console.log(musicList);
    return (
      <div>
        {isLoading && <Loading /> }
        <div>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite-id">
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              name="trackId"
              onChange={ this.handleChange }
              checked={ isFavorite }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
