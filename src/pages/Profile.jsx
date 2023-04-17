import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    isLoading: true,
    userName: '',
    userEmail: '',
    userDescription: '',
    userImg: '',
  };

  componentDidMount() {
    this.handleProfile();
  }

  handleProfile = async () => {
    const userProfile = await getUser();
    // console.log(userProfile);
    this.setState({
      isLoading: false,
    });
    const { name, email, description, image } = userProfile;
    this.setState({
      userName: name,
      userEmail: email,
      userDescription: description,
      userImg: image,
    });
  };

  render() {
    const { userName, userEmail, userDescription, userImg, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <img src={ userImg } data-testid="profile-image" alt="Profile" />
            <h3>Name</h3>
            <p>{userName}</p>
            <h3>Email</h3>
            <p>{userEmail}</p>
            <h3>Descrição</h3>
            <p>{userDescription}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
