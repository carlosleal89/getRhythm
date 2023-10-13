import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    isLoading: true,
    userName: '',
    userEmail: '',
    userDescription: '',
    userImg: '',
    isDisabled: true,
  };

  componentDidMount() {
    this.handleProfile();
  }

  handleProfile = async () => {
    const userProfile = await getUser();
    const { name, email, description, image } = userProfile;
    this.setState({
      userName: name,
      userEmail: email,
      userDescription: description,
      userImg: image,
      isLoading: false,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleError);
  };

  handleError = () => {
    const { userName, userEmail, userDescription, userImg } = this.state;
    const isValid = (
      userName.length > 0
      && userEmail.length > 0
      && userDescription.length > 0
      && userImg.length > 0);
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const validEmail = regex.test(userEmail);
    this.setState({
      isDisabled: !(isValid && validEmail),
    });
  };

  handleButton = async () => {
    this.setState({
      isLoading: true,
    });
    const { userName, userEmail, userDescription, userImg } = this.state;
    const userData = {
      name: userName,
      email: userEmail,
      image: userImg,
      description: userDescription,
    };
    await updateUser(userData);
    this.setState({
      isLoading: false,
    });
    const { history } = this.props;
    history.push('/profile');
  };

  render() {
    const {
      userName,
      userEmail,
      userDescription,
      userImg,
      isLoading,
      isDisabled } = this.state;
    return (
      <div>
        <Header />
        {isLoading ? <Loading /> : (
          <form id='form-profile-container'>
            <img src={ userImg } alt="profile" id='profile-img' />
            <label htmlFor="name-input">
              <p>Name</p>
              <input
                id="name-input"
                type="text"
                name="userName"
                value={ userName }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email-input">
              <p>Email</p>
              <input
                id="email-input"
                type="email"
                name="userEmail"
                value={ userEmail }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description-input">
              <p>Descrição</p>
              <textarea
                id="description-input"
                name="userDescription"
                value={ userDescription }
                onChange={ this.handleChange }
                maxLength="100"
              />
            </label>
            <label htmlFor="img-input">
              <p>Alterar foto</p>
              <input
                id="img-input"
                type="text"
                name="userImg"
                value={ userImg }
                onChange={ this.handleChange }
              />
            </label>
            <button
              disabled={ isDisabled }
              onClick={ this.handleButton }
              className="btn btn-success"
            >
              Editar perfil
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default ProfileEdit;
