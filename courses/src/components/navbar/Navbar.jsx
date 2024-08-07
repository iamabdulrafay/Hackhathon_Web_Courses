import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from "../../assets/codersnippets.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="navbar-container sticky">
        <div className="navbar-logo">
          <img className='logo' src={logo} alt="Logo" />
          <Link to="/">Coderz Snippets</Link>
        </div>
        <span className="openbtn-right" onClick={toggleNav}>
          &#9776; 
        </span>
      </div>

      <div className={`navbar-right ${isOpen ? 'open' : ''}`} id="navbarRight">
        <Link to="/" className="closebtn-right" onClick={toggleNav}>
          &#10006;
        </Link>
        <Link to="/" onClick={toggleNav}>Home</Link>
        <Link to="/about" onClick={toggleNav}>About Us</Link>
        <Link to="/courses" onClick={toggleNav}>Courses</Link>
        <Link to="/login" onClick={toggleNav}>Login</Link>
        <Link to="/register" onClick={toggleNav}>Register</Link>
      </div>
    </div>
  );
};

export default Navbar;
