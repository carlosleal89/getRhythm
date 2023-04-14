import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AlbunsList from '../components/AlbunsList';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    img: '',
    album: '',
    artistName: '',
    musicList: [],
  };

  componentDidMount() {
    const { match: { params: id } } = this.props;
    this.handleMusicList(id);
  }

  handleMusicList = async (id) => {
    const musicList = await getMusics(id.id);
    const { artistName, artworkUrl100, collectionName } = musicList[0];
    this.setState({
      img: artworkUrl100,
      album: collectionName,
      artistName,
      musicList,
    });
  };

  render() {
    const { img, album, artistName, musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{ artistName }</h2>
          <div data-testid="album-name">
            <AlbunsList
              img={ img }
              album={ album }
              artistName={ artistName }
            />
            {
              musicList
                .map((el, index) => index > 0
                  && <MusicCard
                    key={ index }
                    trackName={ el.trackName }
                    previewUrl={ el.previewUrl }
                  />)
            }
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
