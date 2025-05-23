import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Music App</h1>
      <div className="user-info">
        <span>Hello, Admin</span>
        <img src="https://i.pravatar.cc/30" alt="User" />
      </div>
    </header>
  );
};

export default Header;
