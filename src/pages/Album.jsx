import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AlbunsList from '../components/AlbunsList';
import MusicCard from '../components/MusicCard';
import '../styles/Album.css';
import Loading from './Loading';

class Album extends Component {
  state = {
    img: '',
    album: '',
    artistName: '',
    musicList: [],
    isLoading: false,
  };

  componentDidMount() {
    this.handleMusicList();
  }

  handleMusicList = async () => {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    const { artistName, artworkUrl100, collectionName } = musicList[0];
    this.setState({
      img: artworkUrl100,
      album: collectionName,
      artistName,
      musicList,
    });
  };

  render() {
    const { img, album, artistName, musicList, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {isLoading && <Loading />}
          <div id='album-details-conteiner'>
            <h2 className="artist-name-el">{ artistName }</h2>
            <div className="music-list-div">
              <AlbunsList
                img={ img }
                album={ album }
                artistName={ artistName }
              />
              <div className="music-list">
                {
                  musicList
                    .map((el, index) => index > 0
                    && <MusicCard
                      key={ index }
                      trackName={ el.trackName }
                      previewUrl={ el.previewUrl }
                      trackId={ el.trackId }
                      music={ el }
                    />)
                }
              </div>
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
