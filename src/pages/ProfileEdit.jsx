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
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <Loading /> : (
          <form>
            <img src={ userImg } alt="profile" />
            <label htmlFor="name-input">
              Name
              <input
                data-testid="edit-input-name"
                id="name-input"
                type="text"
                name="userName"
                value={ userName }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email-input">
              Email
              <input
                data-testid="edit-input-email"
                id="email-input"
                type="email"
                name="userEmail"
                value={ userEmail }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description-input">
              Descrição
              <textarea
                data-testid="edit-input-description"
                id="description-input"
                name="userDescription"
                value={ userDescription }
                onChange={ this.handleChange }
                maxLength="100"
              />
            </label>
            <label htmlFor="img-input">
              Alterar foto
              <input
                data-testid="edit-input-image"
                id="img-input"
                type="text"
                name="userImg"
                value={ userImg }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="edit-button-save"
              disabled={ isDisabled }
              onClick={ this.handleButton }
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
