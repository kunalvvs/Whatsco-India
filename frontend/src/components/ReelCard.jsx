import { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHeart, FiMessageCircle, FiShare2, FiMoreVertical } from 'react-icons/fi';
import './ReelCard.css';

const ReelCard = ({ reel, isActive }) => {
  const videoRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likes);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="reel-card">
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="reel-video"
        loop
        muted
        playsInline
      />
      
      <div className="reel-overlay">
        <div className="reel-info">
          <div className="reel-user">
            <img src={reel.userAvatar} alt={reel.username} className="user-avatar" />
            <span className="username">@{reel.username}</span>
          </div>
          <p className="reel-title">{reel.title}</p>
        </div>

        <div className="reel-actions">
          <button className={`action-btn-reels ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
            <FiHeart fill={isLiked ? '#EF4444' : 'none'} />
            <span>{likesCount.toLocaleString()}</span>
          </button>
          
          <button className="action-btn-reels">
            <FiMessageCircle />
            <span>{reel.comments}</span>
          </button>
          
          <button className="action-btn-reels">
            <FiShare2 />
          </button>
          
          <button className="action-btn-reels">
            <FiMoreVertical />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
