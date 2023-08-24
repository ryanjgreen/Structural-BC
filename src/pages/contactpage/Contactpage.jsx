import React, { useState } from "react";
import "./contactpage.css";

const FORM_ENDPOINT = "https://herotofu.com/start";

const Contactpage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = e.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Form response was not ok');
        }

        setSubmitted(true);
      })
      .catch((err) => {
        // Submit the form manually
        e.target.submit();
      });
  };

  if (submitted) {
    return (
      <div className="main">
        <div className="structuralBC__contact-content">
          <div className="text-2xl">Thank you!</div>
          <div className="text-md">We'll be in touch soon.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="maincontact">
      <div className="structuralBC__contact-content">
        <form
          action={FORM_ENDPOINT}
          onSubmit={handleSubmit}
          method="POST"
        >
            <h1>Contact Us</h1>

         <div className="info">
            <input
              type="text"
              placeholder="your name"
              name="name"
              className="name"
              required
            />
         
          
            <input
              type="email"
              placeholder="email"
              name="email"
              className="email"
              required
            />
      
        
            <textarea
              placeholder="your message"
              name="message"
              className="message"
              required
            />

            <button
              className="btn3"
              type="submit"
            >
              Send a message
            </button>

          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Contactpage;
