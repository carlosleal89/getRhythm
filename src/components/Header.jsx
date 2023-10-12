import React, { Component } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../data/images/logo.png';

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
      <header className="header-class">
          <ul className="links-el">
            <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favorites
              </Link>
            </li>
            <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
          </ul>
        <div className='header-left'>
          <img src={ logo } alt='logo' id='header-logo' />
          <div className="profile-preview">
              <p className="user-name-class">{ name }</p>
            <img src={ image } alt="user" className="profile-picture" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
