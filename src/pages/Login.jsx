import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'js-md5';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="nameInput"
                  value={ nameInput }
                  onChange={ this.handleChange }
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="emailInput"
                  value={ emailInput }
                  onChange={ this.handleChange }
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Insira um email do Gravatar para uma melhor experiência. Ou qualquer email fictício."
                />
                <label htmlFor="floatingInput">Email</label>
              </div>
            </form>
            <button
              data-testid="login-submit-button"
              onClick={ () => this.handleloginBtn() }
              disabled={ isDisabled }
              className="btn btn-success"
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
