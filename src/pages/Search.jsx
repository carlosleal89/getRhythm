import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import AlbunsList from '../components/AlbunsList';
import '../styles/Search.css';

class Search extends Component {
  state = {
    artistInput: '',
    isDisabled: true,
    isLoading: false,
    artistList: [],
    showArtistName: false,
    notFound: false,
    artistName: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState(
      {
        [name]: value,
      },
      this.handleError,
    );
  };

  handleError = () => {
    const MIN_CHAR = 2;
    const { artistInput } = this.state;
    if (artistInput.length >= MIN_CHAR) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  handleButton = async () => {
    const { artistInput } = this.state;
    this.setState({
      artistName: artistInput,
      artistInput: '',
      isLoading: true,
    });
    try {
      const response = await searchAlbumsAPI(artistInput);
      if (response.length === 0) {
        this.setState({
          isLoading: false,
          notFound: true,
        });
      } else {
        this.setState({
          isLoading: false,
          artistList: response,
          showArtistName: true,
          notFound: false,
        });
      }
    } catch (error) {
      console.log(error.message);
      this.setState({
        notFound: true,
        isLoading: false,
      });
    }
  };

  render() {
    const {
      artistInput,
      isDisabled,
      isLoading,
      artistList,
      showArtistName,
      notFound,
      artistName,
    } = this.state;
    return (
      <div id='main-container'>
        <Header />
            {/* <form> */}
              {/* <div className="form-floating mb-3"> */}
                <input
                  type="text"
                  id="search-input"
                  placeholder="Artista"
                  name="artistInput"
                  value={ artistInput }
                  onChange={ this.handleChange }
                />
                {/* <label htmlFor="floatingInput">Artist Name</label> */}
              {/* </div> */}
            {/* </form> */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="search-form">
            <button
              data-testid="search-artist-button"
              onClick={ this.handleButton }
              disabled={ isDisabled }
              className="btn btn-success"
            >
              Pesquisar
            </button>
            {(notFound && <p>Nenhum álbum foi encontrado</p>)
              || (showArtistName && (
                <div>
                  <p>{`Resultado de álbuns de: ${artistName} `}</p>
                  <div className="albums-list">
                    {artistList.map((el, index) => (
                      <div key={ index }>
                        <Link
                          to={ `/album/${el.collectionId}` }
                          data-testid={ `link-to-album-${el.collectionId}` }
                        >
                          <AlbunsList
                            img={ el.artworkUrl100 }
                            album={ el.collectionName }
                            artistName={ el.artistName }
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
