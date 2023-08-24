import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';


const Footer = () => {
  return (
    <div className="structuralBC__footer">
      <div className="structuralBC__about">
        <h3>About</h3>
        {/* <div className="structuralBC__about-about-us">
          <p>About us</p>
        </div> */}
        <div className="structuralBC__about-contact">
          <Link to = "/contact"> 
          <p>Contact us</p>

          </Link>
        </div>
        {/* <div className="structuralBC__about-team">
          <p>Our team</p>
        </div> */}
      </div>

      <div className="structuralBC__software">
        <h3>Software</h3>
        
        <div className="structuralBC__software-lateral">
          <Link to="/calculators">
          <p>Lateral Earthquake Force calculator</p>
          </Link> 
        </div>
      </div>
    </div>
  );
};

export default Footer;
