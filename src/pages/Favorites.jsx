import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import AlbunsList from '../components/AlbunsList';
import './Favorites.css';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteList: [],
  };

  componentDidMount() {
    this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    this.setState({
      isLoading: true,
    });
    const favorites = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteList: favorites,
    });
  };

  updateState = (trackId) => {
    this.setState((prevState) => {
      const updated = prevState.favoriteList.filter((el) => el.trackId !== trackId);
      return {
        favoriteList: updated,
      };
    });
  };

  render() {
    const { isLoading, favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="songs-preview">
          {isLoading ? <Loading />
            : favoriteList.map((el) => (
              <div key={ el.trackId } className="favorite-section">
                <AlbunsList
                  img={ el.artworkUrl100 }
                  album={ el.collectionName }
                  artistName={ el.artistName }
                />
                <MusicCard
                  music={ el }
                  updateState={ this.updateState }
                  trackId={ el.trackId }
                />
              </div>
            )) }
        </div>
      </div>
    );
  }
}

export default Favorites;
