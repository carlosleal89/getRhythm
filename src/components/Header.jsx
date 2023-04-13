import React, { Component } from 'react';
import './Header.css';
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
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <p>TrybeTunes</p>
            <p data-testid="header-user-name">{ name }</p>
          </>
        )}
      </header>
    );
  }
}

export default Header;
