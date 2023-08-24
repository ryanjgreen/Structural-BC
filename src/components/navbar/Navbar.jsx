import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './navbar.css';
import { useAuth } from '../../AuthContext';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();


  const handleLogout = () => {
    logout();
    // Optionally, you can redirect the user to a specific page after logout
    // window.location.href = '/';
  };

  return (
    <div className="structuralBC__navbar">
      <div className="structuralBC__navbar-links">
        <Link to="/">
          <div className="structuralBC__navbar-links_logo">
            <img src={logo} alt="Logo" />
          </div>
        </Link>

    
      </div>

      <div className="structuralBC__navbar-sign">
  {isAuthenticated && user ? (
    <div className="user-profile">
      {/* <p className="user-name">{user.firstName}</p> */}
      <FaUserCircle size={30} />
      <button onClick={handleLogout}>Sign out</button> 

    </div>
  ) : (
    <>
     <div className="structuralBC__navbar-links_container">
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/calculators">Calculators</Link>
          </p>
          <p>
            <Link to="/contact">Contact</Link>
          </p>
        </div>
      <p>
        <Link to="/signin">Sign in</Link>
      </p>
      <button type="button">
        <Link to="/signup">Sign up</Link>
      </button>
    </>
  )}
</div>

      <div className="structuralBC__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="structuralBC__navbar-menu_container scale-up-center">
            <div className="structuralBC__navbar-menu_container-links">
              <p>
                <Link to="/calculators">Calculators</Link>
              </p>
              <p>
                <Link to="/contact">Contact</Link>
              </p>
            </div>
            <div className="structuralBC__navbar-menu_container-links-sign">
              {isAuthenticated ? (
                <p>Logged in</p>
              ) : (
                <>
                  <p>
                    <Link to="/signin">Sign in</Link>
                  </p>
                  <button type="button">
                    <Link to="/signup">Sign up</Link>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
