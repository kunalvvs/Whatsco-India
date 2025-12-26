import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  FiArrowLeft, FiSend, FiSmile, FiPaperclip, 
  FiImage, FiFile, FiVideo, FiPhone, FiMoreVertical,
  FiCheck, FiCheckCircle
} from 'react-icons/fi';
import './ChatMessages.css';

function ChatMessages() {
  const { chatId } = useParams();
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hey! How are you?',
      time: '10:30 AM',
      sent: false,
      read: true
    },
    {
      id: 2,
      text: 'I\'m good! Just checking out the new collection.',
      time: '10:32 AM',
      sent: true,
      read: true
    },
    {
      id: 3,
      text: 'Great! Let me know if you need any help.',
      time: '10:33 AM',
      sent: false,
      read: true
    },
    {
      id: 4,
      text: 'Sure, thanks! 😊',
      time: '10:35 AM',
      sent: true,
      read: true
    }
  ]);

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '✨', '💯', '👏', '🙌', '💪', '🤔', '😍', '🤗', '😎', '🥳'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        sent: true,
        read: false
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleAttachment = (type) => {
    console.log('Attachment type:', type);
    setShowAttachMenu(false);
    // TODO: Implement file upload logic
  };

  const contact = {
    id: chatId || '1',
    name: 'Rahul Sharma',
    avatar: 'https://i.pravatar.cc/150?img=12',
    online: true,
    lastSeen: 'online'
  };

  return (
    <div className="chat-messages-page">
      {/* Chat Header */}
      <div className="chat-messages-header">
        <Link to="/chat" className="back-btn">
          <FiArrowLeft />
        </Link>

        <div className="contact-info">
          <div className="contact-avatar">
            <img src={contact.avatar} alt={contact.name} />
            {contact.online && <span className="online-indicator"></span>}
          </div>
          <div className="contact-details">
            <h3>{contact.name}</h3>
            <p className="status">{contact.lastSeen}</p>
          </div>
        </div>

        <div className="header-actions">
          <Link to={`/video-call/${contact.id}`} className="action-btn">
            <FiVideo />
          </Link>
          <Link to={`/voice-call/${contact.id}`} className="action-btn">
            <FiPhone />
          </Link>
          <button className="action-btn">
            <FiMoreVertical />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-area">
        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sent ? 'sent' : 'received'}`}>
              {!msg.sent && (
                <img 
                  src={contact.avatar} 
                  alt="" 
                  className="message-avatar"
                />
              )}
              <div className="message-content">
                <div className="message-bubble">
                  <p>{msg.text}</p>
                </div>
                <div className="message-meta">
                  <span className="message-time">{msg.time}</span>
                  {msg.sent && (
                    <span className="message-status">
                      {msg.read ? (
                        <FiCheckCircle className="read" />
                      ) : (
                        <FiCheck className="sent" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="emoji-picker">
          <div className="emoji-grid">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                className="emoji-btn"
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attachment Menu */}
      {showAttachMenu && (
        <div className="attachment-menu">
          <button 
            className="attachment-option"
            onClick={() => handleAttachment('image')}
          >
            <div className="attachment-icon image">
              <FiImage />
            </div>
            <span>Photos</span>
          </button>
          <button 
            className="attachment-option"
            onClick={() => handleAttachment('video')}
          >
            <div className="attachment-icon video">
              <FiVideo />
            </div>
            <span>Videos</span>
          </button>
          <button 
            className="attachment-option"
            onClick={() => handleAttachment('file')}
          >
            <div className="attachment-icon file">
              <FiFile />
            </div>
            <span>Document</span>
          </button>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="message-input-area">
        <button
          type="button"
          className="input-action-btn"
          onClick={() => {
            setShowAttachMenu(!showAttachMenu);
            setShowEmojiPicker(false);
          }}
        >
          <FiPaperclip />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />

        <button
          type="button"
          className="input-action-btn"
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
            setShowAttachMenu(false);
          }}
        >
          <FiSmile />
        </button>

        <button 
          type="submit" 
          className="send-btn"
          disabled={!message.trim()}
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
}

export default ChatMessages;
