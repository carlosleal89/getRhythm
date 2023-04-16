import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AlbunsList from '../components/AlbunsList';
import MusicCard from '../components/MusicCard';
import './Album.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  state = {
    img: '',
    album: '',
    artistName: '',
    musicList: [],
    isLoading: false,
    favoriteSongs: [],
    checked: false,
  };

  componentDidMount() {
    const { match: { params: id } } = this.props;
    this.handleFavorites();
    this.handleMusicList(id);
  }

  handleFavorites = async () => {
    this.setState({
      isLoading: true,
    });
    const favorites = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs: favorites,
    });
    console.log(favorites);
  };

  handleMusicList = async (id) => {
    const musicList = await getMusics(id.id);
    musicList.shift();
    // console.log(musicList);
    const { artistName, artworkUrl100, collectionName } = musicList[0];
    this.setState({
      img: artworkUrl100,
      album: collectionName,
      artistName,
      musicList,
    });
  };

  render() {
    const { img, album, artistName, musicList, isLoading, favoriteSongs, checked } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {isLoading && <Loading />}
          <h2 data-testid="artist-name">{ artistName }</h2>
          <div data-testid="album-name" className="music-list-div">
            <AlbunsList
              img={ img }
              album={ album }
              artistName={ artistName }
            />
            <div className="music-list">
              {
                musicList
                  .map((el, index) => (<MusicCard
                    key={ index }
                    trackName={ el.trackName }
                    previewUrl={ el.previewUrl }
                    trackId={ el.trackId }
                    { ...el }
                  />))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
