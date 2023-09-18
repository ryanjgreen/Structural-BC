# Structural BC - Modernizing Seismic Engineering

![Structural BC Logo](src/assets/logo.svg)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [How to Use](#how-to-use)


## Overview

Structural BC is a service-based business aimed at revolutionizing seismic engineering practices. Our mission is to reduce calculation time for structural engineers by providing a user-friendly Specified Lateral Earthquake Force calculator. This calculator takes into account various parameters crucial for seismic design, making it an indispensable tool for engineers working on earthquake-resistant structures.

## Features

- **Location-Specific Seismic Data**: Structural BC leverages government APIs to retrieve location-specific seismic data, ensuring accurate calculations based on the project's geographical context.

- **Customizable Parameters**: The calculator allows users to input a wide range of parameters, including:
    - Location
    - Site Class (e.g., hard rock, stiff soil)
    - Earthquake Importance Factor (e.g., post-disaster for schools and hospitals, normal for houses)
    - Structural System (moment frame, braced frame, shear wall)
    - Building Material (timber, steel, concrete, masonry)
    - Total Building Weight and Height
    - Individual Storey Details
    - Seismic Force-Resisting System (SFRS) Type

- **Dynamic Website**: We have designed and implemented a dynamic website using React, JavaScript, and CSS, providing an intuitive user interface for easy data input and result visualization.

- **Efficient Backend**: The backend is powered by Python Flask, ensuring seamless data processing and communication between the frontend and external APIs.

## Technologies Used

- **Frontend**:
    - React
    - JavaScript
    - CSS

- **Backend**:
    - Python Flask

- **External APIs**:
    - Government APIs for seismic data

## How to Use

To use the Structural BC Specified Lateral Earthquake Force calculator, follow these steps:

1. Visit the [Structural BC Website](https://www.structuralbc.com).

2. Create an account by navigating to the sign up, then sign in and navigate to the calculators page.

3. Input your project details, including location, site class, earthquake importance factor, structural system, building material, weight and height, storey details, and SFRS type.

4. Click the "Calculate" button to generate the specified lateral earthquake force for your project.

5. Review and analyze the results, which will be displayed on the website.


