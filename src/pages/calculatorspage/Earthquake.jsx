import React from 'react';
import './earthquake.css';
import logo from '../../assets/logo.svg';
import Questions from '../questions/Questions';



const Earthquake = () => {


  return (
    <div className="Calculator-heading section__padding">
      <div className="align">
      <div className="code-title"> 
      <div className="Calculator-title">
        <h2>
        Specified Lateral Earthquake Force Calculator
        </h2>
      </div>
      
      <div className="Code">
        <h3>
          British Columbia Building Code 2023
        </h3>   

        <p>
        This calculator is used for generating specified lateral earthquake force for structures in accordance with British Columbia Building Code 2023 - Division B Part 4 - Structural Design. 
            </p>         
      </div>

      </div> 

      <div className="Calculator-logo">
        <img src={logo} alt="Logo" />
      </div>
      </div>
      <div className="WhiteSheet">
        <div className ="Sitedata">
          <div className="pdf">
          <h3>
            Site Data
          </h3>


        </div>
          
          <Questions/>

        </div>


       

      
      </div>
      

      

       
      </div>

   
  );
};

export default Earthquake;
