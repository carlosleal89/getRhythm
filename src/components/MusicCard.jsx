import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favorites = await getFavoriteSongs();
    const checked = favorites.some((el) => el.trackId === trackId);
    this.setState({
      isFavorite: checked,
    });
  }

  handleChange = ({ target }) => {
    // const { name } = target;
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
    console.log(isFavorite);
    if (isFavorite) {
      this.setState({
        isLoading: true,
      });
    }
    if (isFavorite) {
      await addSong(this.props);
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });
      await removeSong(this.props);
      this.setState({
        isLoading: false,
      });
    }
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
