import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FiMic, FiMicOff, FiPhoneOff, FiVolume2, FiVolumeX 
} from 'react-icons/fi';
import './VoiceCall.css';

function VoiceCall() {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
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

  return (
    <div className="voice-call-page">
      <div className="voice-call-container">
        {/* Contact Info */}
        <div className="voice-call-header">
          <div className="contact-avatar-voice">
            <img src={contact.avatar} alt={contact.name} />
            <div className="audio-wave-container">
              <div className="audio-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <h2 className="contact-name">{contact.name}</h2>
          
          {isConnecting ? (
            <p className="call-status connecting">Connecting...</p>
          ) : (
            <p className="call-status connected">{formatDuration(callDuration)}</p>
          )}
        </div>

        {/* Call Controls */}
        <div className="voice-call-controls">
          <div className="control-row">
            <button 
              className={`voice-control-btn ${isMuted ? 'active' : ''}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              <div className="control-icon">
                {isMuted ? <FiMicOff /> : <FiMic />}
              </div>
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>

            <button 
              className={`voice-control-btn ${isSpeakerOn ? 'active' : ''}`}
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              <div className="control-icon">
                {isSpeakerOn ? <FiVolume2 /> : <FiVolumeX />}
              </div>
              <span>{isSpeakerOn ? 'Speaker On' : 'Speaker Off'}</span>
            </button>
          </div>

          <button 
            className="end-call-btn-voice"
            onClick={handleEndCall}
          >
            <FiPhoneOff />
            <span>End Call</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoiceCall;
