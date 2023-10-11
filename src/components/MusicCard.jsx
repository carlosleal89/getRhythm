import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../styles/MusicCard.css';

class MusicCard extends Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  componentDidMount() {
    this.checkFavorites();
  }

  checkFavorites = async () => {
    const { trackId } = this.props;
    const favorites = await getFavoriteSongs();
    const checked = favorites.some((el) => el.trackId === trackId);
    this.setState({
      isFavorite: checked,
    });
  };

  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        isFavorite: value,
      },
      this.handleFavorite,
    );
  };

  handleFavorite = async () => {
    const { isFavorite } = this.state;
    const { updateState, trackId, music } = this.props;
    if (isFavorite) {
      await addSong(music);
    } else {
      await removeSong(music);
      if (typeof updateState === 'function') {
        updateState(trackId);
      }
    }
    this.forceUpdate();
  };

  render() {
    const { music, previewUrl, trackId } = this.props;
    const { isLoading, isFavorite } = this.state;
    return (
      <div>
        {isLoading && <Loading /> }
        <div className="music-name-favorite-el">
          <label htmlFor={ trackId }>
            <input
              id={ trackId }
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              name="trackId"
              onChange={ this.handleChange }
              checked={ isFavorite }
            />
          </label>
          <h5>{music.trackName}</h5>
        </div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
