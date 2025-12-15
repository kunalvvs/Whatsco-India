import { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      alt: 'Product 1'
    },
    {
      src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      alt: 'Product 2'
    },
    {
      src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
      alt: 'Product 3'
    },
    {
      src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80',
      alt: 'Product 4'
    },
    {
      src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80',
      alt: 'Product 5'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const scrollToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="home-page">
      {/* Premium Ad Section */}
      <div className="premium-ad-section">
        <div className="ad-label">ADS</div>
        <div className="ad-card">
          <img 
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80" 
            alt="Premium Leather Collection"
            className="ad-image"
          />
          <div className="ad-content">
            <h2>Premium Leather Collection</h2>
            <p>Handcrafted excellence for every occasion</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" placeholder="Let's talk to loved ones" />
        </div>
      </div>

      {/* Film Strip Section */}
      <div className="film-strip-section">
        <h3>FILM STRIP..</h3>
        <div className="film-strip-scroll">
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`film-item ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => scrollToImage(index)}
            >
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>

        {/* Main Display Image */}
        <div className="main-display">
          <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} />
        </div>

        <button className="lets-go-btn" onClick={nextImage}>
          Let's GO
        </button>
      </div>
    </div>
  );
}

export default Home;
