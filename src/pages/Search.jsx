import React, { Component } from "react";
import Header from "../components/Header";
import searchAlbumsAPI from "../services/searchAlbumsAPI";
import Loading from "./Loading";
import AlbunsList from "../components/AlbunsList";

class Search extends Component {
  state = {
    artistInput: "",
    isDisabled: true,
    isLoading: false,
    artistList: [],
    showArtistName: false,
    notFound: false,
    artistName: "",
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState(
      {
        [name]: value,
      },
      this.handleError
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
      artistInput: "",
      isLoading: true,
    });
    try {
      const response = await searchAlbumsAPI(artistInput);
      console.log(response.length);
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
      <div data-testid="page-search">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <form>
              <label htmlFor="artist-input">
                <input
                  data-testid="search-artist-input"
                  placeholder="Nome do artista"
                  name="artistInput"
                  id="artist-input"
                  value={artistInput}
                  onChange={this.handleChange}
                />
              </label>
            </form>
            <button
              data-testid="search-artist-button"
              onClick={this.handleButton}
              disabled={isDisabled}
            >
              Pesquisar
            </button>
            {(notFound && <p>Nenhum álbum foi encontrado</p>) ||
              (showArtistName && (
                <div>
                  <p>{`Resultado de álbuns de: ${artistName} `}</p>
                  {artistList.map((el, index) => (
                    <div key={index}>
                      <AlbunsList
                        img={el.artworkUrl100}
                        album={el.collectionName}
                        artistName={el.artistName}
                      />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
