import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import image1 from '../../assets/carousel2.jpg';
import image2 from '../../assets/home1.png';
import image3 from '../../assets/carousel3.jpg';
import image4 from '../../assets/home2.jpg';
import image5 from '../../assets/home3.png';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/login');
  };

  const images = [image1, image2, image3, image4, image5];

  return (
    <div className="landing-container position-relative">
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="1000">
        <div className="carousel-inner">
          {images.map((img, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <img src={img} className="d-block w-100 carousel-img" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="fixed-caption d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="display-4 fw-bold text-white">Welcome to Book Finder</h1>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleExploreClick}
          className="explore-btn mt-4"
        >
          Explore Books !!
        </Button>
      </div>
    </div>
  );
};

export default Home;
