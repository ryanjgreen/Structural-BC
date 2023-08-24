import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './header.css';
import city from '../../assets/city.png';

const Header = () => {
  const location = useLocation();
  const headerRoutes = ['/']; // Add other routes that should display the header

  if (headerRoutes.includes(location.pathname)) {
    return (
      <div className="structuralBC__header section__padding" id="home">
        <div className="structuralBC__header-content">
          <h1 className="gradient__text">Structural Analysis Software</h1>
          <p>Unlock the potential of cloud-based structural engineering software and leverage powerful engineering calculations. Streamline your design workflow and boost efficiency with cutting-edge technology.</p>

          <div className="structuralBC__header-content__input">
            {/* Wrap the button with the Link component */}
            <Link to="/calculators">
              <button type="button">Get Started For 30 Days Free</button>
            </Link>
          </div>
        </div>

        <div className="structuralBC__header-image">
          <img src={city} alt="City" />
        </div>
      </div>
    );
  }

  // Return null to not render anything for other routes
  return null;
};

export default Header;
