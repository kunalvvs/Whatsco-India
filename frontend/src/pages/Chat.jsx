import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiPaperclip, FiPhone, FiVideo, FiMoreVertical, FiSearch } from 'react-icons/fi';
import ChatBubble from '../components/ChatBubble';
import { chatList, messages } from '../data/dummyData';
import './Chat.css';

const Chat = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        senderId: 'me',
        text: messageInput,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isOwn: true
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className="chat-page">
      {/* <Header /> */}
      
      <div className="chat-container">
        {/* Chat List Sidebar */}
        <aside className="chat-sidebar">
          <div className="chat-sidebar-header">
            <h2>Messages</h2>
            <div className="search-box">
              <FiSearch />
              <input type="text" placeholder="Search conversations..." />
            </div>
          </div>

          <div className="chat-list">
            {chatList.map(chat => (
              <div
                key={chat.id}
                className={`chat-list-item ${selectedChat.id === chat.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="chat-avatar-wrapper">
                  <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
                  {chat.online && <span className="online-indicator" />}
                </div>
                <div className="chat-info">
                  <div className="chat-top">
                    <h4>{chat.name}</h4>
                    <span className="chat-time">{chat.timestamp}</span>
                  </div>
                  <div className="chat-bottom">
                    <p className="last-message">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="unread-badge">{chat.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <main className="chat-main">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-user-info">
              <div className="chat-avatar-wrapper">
                <img src={selectedChat.avatar} alt={selectedChat.name} className='chat-avatar' />
                {selectedChat.online && <span className="online-indicator" />}
              </div>
              <div>
                <h3>{selectedChat.name}</h3>
                <span className="user-status">
                  {selectedChat.online ? 'Active now' : 'Offline'}
                </span>
              </div>
            </div>
            <div className="chat-actions">
              <button 
                className="action-icon-btn"
                onClick={() => navigate(`/voice-call/${selectedChat.id}`)}
                title="Voice Call"
              >
                <FiPhone />
              </button>
              <button 
                className="action-icon-btn"
                onClick={() => navigate(`/video-call/${selectedChat.id}`)}
                title="Video Call"
              >
                <FiVideo />
              </button>
              <button className="action-icon-btn" title="More Options">
                <FiMoreVertical />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="messages-area">
            {chatMessages.map(message => (
              <ChatBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form className="message-input-area" onSubmit={handleSendMessage}>
            <button type="button" className="attachment-btn">
              <FiPaperclip />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="submit" className="send-btn1" disabled={!messageInput.trim()}>
              <FiSend />
            </button>
          </form>
        </main>
      </div>
            {/* <BottomNav/> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Chat;
