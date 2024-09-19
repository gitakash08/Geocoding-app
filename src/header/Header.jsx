import React from 'react';
import './Header.css';
const Header = () => {
  return (
    <header className="custom-header">
      <div className="header-content">
        <img src="/logo.png" alt="India Geocoder Logo" className="logo" />
        <h1 className="brand-name">INDIA GEOCODER</h1>
      </div>
    </header>
  );
};

export default Header;
