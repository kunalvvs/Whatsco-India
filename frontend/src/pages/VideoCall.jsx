import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FiMic, FiMicOff, FiVideo, FiVideoOff, 
  FiPhoneOff, FiMaximize2, FiMinimize2 
} from 'react-icons/fi';
import './VideoCall.css';

function VideoCall() {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);

  const contact = {
    id: contactId || '1',
    name: 'Rahul Sharma',
    avatar: 'https://i.pravatar.cc/150?img=12'
  };

  useEffect(() => {
    // Simulate connection
    const connectTimer = setTimeout(() => {
      setIsConnecting(false);
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (!isConnecting) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isConnecting]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate(-1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="video-call-page">
      {/* Remote Video (Main) */}
      <div className="remote-video">
        {isConnecting ? (
          <div className="connecting-overlay">
            <div className="contact-avatar-large">
              <img src={contact.avatar} alt={contact.name} />
            </div>
            <h2>{contact.name}</h2>
            <p className="connecting-text">Connecting...</p>
            <div className="pulse-loader">
              <div className="pulse"></div>
              <div className="pulse"></div>
              <div className="pulse"></div>
            </div>
          </div>
        ) : (
          <div className="video-placeholder">
            <div className="contact-avatar-large">
              <img src={contact.avatar} alt={contact.name} />
            </div>
            <h2>{contact.name}</h2>
          </div>
        )}
      </div>

      {/* Local Video (Picture-in-Picture) */}
      <div className={`local-video ${isVideoOff ? 'video-off' : ''}`}>
        {isVideoOff ? (
          <div className="video-off-indicator">
            <FiVideoOff />
            <span>Camera Off</span>
          </div>
        ) : (
          <div className="local-video-placeholder">
            <p>You</p>
          </div>
        )}
      </div>

      {/* Call Info */}
      {!isConnecting && (
        <div className="call-info">
          <h3>{contact.name}</h3>
          <p className="call-duration">{formatDuration(callDuration)}</p>
        </div>
      )}

      {/* Call Controls */}
      <div className="call-controls">
        <button 
          className={`control-btn ${isMuted ? 'active' : ''}`}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <FiMicOff /> : <FiMic />}
        </button>

        <button 
          className={`control-btn ${isVideoOff ? 'active' : ''}`}
          onClick={() => setIsVideoOff(!isVideoOff)}
        >
          {isVideoOff ? <FiVideoOff /> : <FiVideo />}
        </button>

        <button 
          className="control-btn end-call-btn"
          onClick={handleEndCall}
        >
          <FiPhoneOff />
        </button>

        <button 
          className="control-btn"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
        </button>
      </div>
    </div>
  );
}

export default VideoCall;
