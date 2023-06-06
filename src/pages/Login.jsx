import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'js-md5';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './Login.css';

class Login extends Component {
  state = {
    nameInput: '',
    emailInput: '',
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
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { nameInput, emailInput } = this.state;
    if (nameInput.length >= MIN_CHAR && emailValidation.test(emailInput)) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  handleloginBtn = async () => {
    this.setState({
      isLoading: true,
    });
    const { nameInput, emailInput } = this.state;
    const { history } = this.props;
    const hash = md5(emailInput).toString();
    const response = await createUser({ name: nameInput, email: emailInput, image: `https://www.gravatar.com/avatar/${hash}` });
    if (response) {
      history.push('/search');
    }
  };

  render() {
    const { nameInput, emailInput, isDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login" className="login">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="login-div-class">
            <p>Login</p>
            <form>
              <label htmlFor="name-input">
                <input
                  data-testid="login-name-input"
                  type="text"
                  id="name-input"
                  name="nameInput"
                  value={ nameInput }
                  onChange={ this.handleChange }
                  placeholder="Name"
                />
              </label>
              <label htmlFor="email-input">
                <input
                  type="email"
                  id="email-input"
                  name="emailInput"
                  value={ emailInput }
                  onChange={ this.handleChange }
                  placeholder="Email"
                />
              </label>
            </form>
            <button
              data-testid="login-submit-button"
              onClick={ () => this.handleloginBtn() }
              disabled={ isDisabled }
            >
              Entrar
            </button>
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
