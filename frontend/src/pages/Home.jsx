
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTrendingUp, FiVideo, FiPlay, FiMessageCircle, FiSend, FiChevronLeft, FiChevronRight, FiPlus, FiUserPlus } from 'react-icons/fi';
import './Home.css';
import { chatList, messages, reels } from '../data/dummyData';
import ContactSelection from '../components/ContactSelection';


function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFAB, setShowFAB] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  
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

  // Swipe gesture handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 10) {
      // Swipe left detected
      setShowFAB(true);
    }
    if (touchEndX - touchStartX > 10) {
      // Swipe right detected
      setShowFAB(false);
    }
  };

  

  return (
    <div className="home-page">
      {/* Premium Ad Section */}
      <div className="premium-ad-section">
        <div className="ad-label">ADS</div>
        <div className="ad-card">
          <img 
            src="https://preview--baoa-friendly-hub.lovable.app/assets/hero-shoe-CyAl2QiJ.jpg" 
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


    {/* Chat Section */}
      <section 
        className="home-chat-section"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="container">
          {/* <div className="chat-section-header">
            <h2 className="section-title">
              <FiMessageCircle /> Chat with Friends
            </h2>
            <Link to="/chat" className="view-all-link">
              View All <FiArrowRight />
            </Link>
          </div> */}
          <div className="chat-profiles-grid">
            {/* First Row - 4 profiles */}
            <div className="chat-row">
              {chatList.slice(0, 13).map(chat => (
                <Link to="/chat" key={chat.id} className="chat-profile-item">
                  <div className="chat-profile-avatar">
                    <img src={chat.avatar} alt={chat.name} />
                    {chat.online && <span className="profile-online-dot"></span>}
                  </div>
                  {/* <span className="chat-profile-name">{chat.name.split(' ')[0]}</span> */}
                  {chat.unread > 0 && (
                    <div className="profile-unread-badge">{chat.unread}</div>
                  )}
                </Link>
              ))}

              {/* <Link to="/chat" className="chat-profile-item add-more">
                <div className="chat-profile-avatar plus-avatar">
                  <FiPlus size={32} />
                </div>
                <span className="chat-profile-name"></span>
              </Link> */}
            </div>
  
          </div>
        </div>
      </section>



      {/* Film Strip Section */}
      <div className="film-strip-section">
{/*         
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
        </div> */}

        {/* Main Display Image */}
         <h3 className='film'>FILM STRIP..</h3>
      

         {/* Reels Banner - Horizontal Scroll */}
      <section className="reels-banner-youtube">
        <div className="container">
         
          <div className="reels-horizontal-scroll single-reel">
            {reels.slice(0, 1).map((reel, index) => (
              <Link to="/reels" key={reel.id} className="youtube-reel-card-horizontal" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="reel-video-wrapper">
                  <video 
                    src={reel.videoUrl} 
                    className="reel-preview-video"
                    loop 
                    muted 
                    playsInline
                    autoPlay
                  />
                  <div className="reel-play-overlay">
                    <FiPlay className="reel-play-icon" />
                  </div>
                </div>
                {/* info removed on home single view
                <div  className="reel-card-info ">
                  <h4>{reel.title}</h4>
                  <span className="reel-views">{(reel.views / 1000).toFixed(1)}K views</span>
                </div>
                */}
              </Link>
            ))}
            <Link to="/reels" className="view-all-reels">
              Let's GO <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      {showFAB && (
        <button 
          className="chat-fab"
          onClick={() => setShowContactModal(true)}
          title="New Chat"
        >
          <FiUserPlus size={24} />
        </button>
      )}

      {/* Contact Selection Modal */}
      <ContactSelection 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        contacts={chatList}
      />
      </div>
    </div>
  );
}

export default Home;
