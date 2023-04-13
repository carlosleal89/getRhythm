import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    nameInput: '',
    isDisabled: true,
    isLoading: false,
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
    const MIN_CHAR = 3;
    const { nameInput } = this.state;
    if (nameInput.length >= MIN_CHAR) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  handleloginBtn = async () => {
    this.setState({
      isLoading: true,
    });
    const { nameInput } = this.state;
    const { history } = this.props;
    const response = await createUser({ name: nameInput });
    if (response) {
      history.push('/search');
    }
  };

  render() {
    const { nameInput, isDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <p>Login</p>
            <form>
              <label htmlFor="">
                <p>Digite seu nome:</p>
                <input
                  data-testid="login-name-input"
                  type="text"
                  id="name-input"
                  name="nameInput"
                  value={ nameInput }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="login-submit-button"
                onClick={ () => this.handleloginBtn() }
                disabled={ isDisabled }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
