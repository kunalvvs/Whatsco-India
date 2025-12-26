import { useState } from 'react';
import { FiArrowLeft, FiSearch, FiMoreVertical, FiUsers, FiUserPlus, FiMessageCircle, FiX } from 'react-icons/fi';
import './ContactSelection.css';

function ContactSelection({ isOpen, onClose, contacts = [] }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const quickActions = [
    { id: 1, icon: <FiUsers size={24} />, label: 'New group', color: '#5b9cff' },
    { id: 2, icon: <FiUserPlus size={24} />, label: 'New contact', color: '#5b9cff' },
    { id: 3, icon: <FiUsers size={24} />, label: 'New community', color: '#5b9cff' },
    // { id: 4, icon: <FiMessageCircle size={24} />, label: 'Chat with AIs', color: '#5b9cff' }
  ];

  return (
    <div className="contact-selection-overlay">
      <div className="contact-selection-page">
        {/* Header */}
        <div className="contact-header">
          <button className="back-button" onClick={onClose}>
            <FiArrowLeft size={24} />
          </button>
          <div className="header-info">
            <h2>Select contact</h2>
            <p>{filteredContacts.length} contacts</p>
          </div>
          <button className="search-button">
            <FiSearch size={20} />
          </button>
          <button className="more-button">
            <FiMoreVertical size={20} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-contact">
          {quickActions.map(action => (
            <div key={action.id} className="action-item">
              <div className="action-icon" style={{ backgroundColor: action.color }}>
                {action.icon}
              </div>
              <span className="action-label">{action.label}</span>
            </div>
          ))}
        </div>

        {/* Contacts Section */}
        <div className="contacts-section-header">
          <h3>Contacts on Whatsco</h3>
        </div>

        {/* Contacts List */}
        <div className="contacts-list">
          {filteredContacts.map(contact => (
            <div key={contact.id} className="contact-list-item" onClick={onClose}>
              <img src={contact.avatar} alt={contact.name} className="contact-avatar-img" />
              <div className="contact-details">
                <h4>{contact.name}</h4>
                {contact.status && <p className="contact-status">{contact.status}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactSelection;
