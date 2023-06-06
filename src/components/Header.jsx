import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    name: '',
    image: '',
    isLoading: true,
  };

  componentDidMount() {
    this.handleUserName();
  }

  handleUserName = async () => {
    const { name, image } = await getUser();
    this.setState({
      name,
      image,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, name, image } = this.state;
    return (
      <header data-testid="header-component" className="header-class">
        <ul className="links-el">
          <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favorites
            </Link>
          </li>
          <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
        </ul>
        <h1>TrybeTunes</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="profile-preview">
            <div className="name-el">
              <p data-testid="header-user-name" className="user-name-class">{ name }</p>
            </div>
            <img src={ image } alt="user" className="profile-picture" />
          </div>
        )}
      </header>
    );
  }
}

export default Header;
