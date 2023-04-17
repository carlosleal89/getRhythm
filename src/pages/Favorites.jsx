import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import AlbunsList from '../components/AlbunsList';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteList: [],
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const favorites = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteList: favorites,
    });
  }

  render() {
    const { isLoading, favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading ? <Loading />
          : favoriteList.map((el, index) => (
            <div key={ index }>
              <AlbunsList img={ el.artworkUrl100 } />
              <MusicCard { ...el } />
            </div>
          )) }
      </div>
    );
  }
}

export default Favorites;
