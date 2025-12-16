import './ChatBubble.css';

const ChatBubble = ({ message }) => {
  return (
    <div className={`chat-bubble ${message.isOwn ? 'own' : 'other'}`}>
      <div className="message-content">
        <p>{message.text}</p>
      </div>
      <span className="message-time">{message.timestamp}</span>
    </div>
  );
};

export default ChatBubble;
