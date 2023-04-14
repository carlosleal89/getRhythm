import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artistInput: '',
    isDisabled: true,
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

  handleButton = () => {
    console.log('oi');
  };

  render() {
    const { artistInput, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artist-input">
            <input
              data-testid="search-artist-input"
              placeholder="Nome do artista"
              name="artistInput"
              id="artist-input"
              value={ artistInput }
              onChange={ this.handleChange }
            />
          </label>
        </form>
        <button
          data-testid="search-artist-button"
          onClick={ this.handleButton }
          disabled={ isDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
