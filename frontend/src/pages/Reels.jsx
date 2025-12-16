import { useState, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ReelCard from '../components/ReelCard';
import { reels } from '../data/dummyData';
import './Reels.css';

const Reels = () => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const windowHeight = window.innerHeight;
        const index = Math.round(scrollTop / windowHeight);
        setActiveReelIndex(index);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="reels-page">
      <div className="reels-header">
        <Link to="/" className="close-reels">
          <FiX size={28} />
        </Link>
        <h3>Reels</h3>
      </div>

      <div className="reels-container" ref={containerRef}>
        {reels.map((reel, index) => (
          <ReelCard 
            key={reel.id} 
            reel={reel} 
            isActive={index === activeReelIndex}
          />
        ))}
      </div>

      <div className="reels-navigation">
        <div className="nav-dots">
          {reels.map((_, index) => (
            <div
              key={index}
              className={`nav-dot ${index === activeReelIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
      {/* <BottomNav/> */}
    </div>
  );
};

export default Reels;
