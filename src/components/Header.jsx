import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    name: '',
    isLoading: true,
  };

  componentDidMount() {
    this.handleUserName();
  }

  handleUserName = async () => {
    const { name } = await getUser();
    this.setState({
      name,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, name } = this.state;
    return (
      <header data-testid="header-component" className="header-class">
        <ul>
          <li><Link to="/search" data-testid="link-to-search">Pesquisar</Link></li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
        </ul>
        <p>TrybeTunes</p>
        {isLoading ? (
          <Loading />
        ) : (
          <p data-testid="header-user-name" className="user-name-class">{ name }</p>
        )}
      </header>
    );
  }
}

export default Header;
