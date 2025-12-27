import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiMessageCircle, FiChevronRight } from 'react-icons/fi';
import './HelpSupport.css';

function HelpSupport() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'Go to your Account page and click on "My Orders". Select the order you want to track and you\'ll see real-time updates on its status.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy. Items must be unused and in original packaging. Contact us to initiate a return.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. Express shipping is available and takes 2-3 business days.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within India. International shipping will be available soon.'
    },
    {
      question: 'How can I become a seller?',
      answer: 'Visit the "Become a Seller" page from your Account menu and fill out the application form. Our team will review and contact you.'
    }
  ];

  const contactOptions = [
    {
      icon: <FiMail />,
      title: 'Email Us',
      description: 'support@whatsco.in',
      action: 'mailto:support@whatsco.in'
    },
    {
      icon: <FiPhone />,
      title: 'Call Us',
      description: '+91 98765 43210',
      action: 'tel:+919876543210'
    },
    {
      icon: <FiMessageCircle />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: '/chat'
    }
  ];

  return (
    <div className="help-support-page">
      <div className="help-header">
        <button className="back-btn" onClick={() => navigate('/account')}>
          <FiArrowLeft />
        </button>
        <h2>Help & Support</h2>
        <div></div>
      </div>

      <div className="help-content">
        {/* Contact Options */}
        <div className="contact-section">
          <h3>Contact Us</h3>
          {contactOptions.map((option, index) => (
            <a
              key={index}
              href={option.action}
              className="contact-option"
            >
              <div className="contact-icon">{option.icon}</div>
              <div className="contact-info">
                <h4>{option.title}</h4>
                <p>{option.description}</p>
              </div>
              <FiChevronRight className="contact-arrow" />
            </a>
          ))}
        </div>

        {/* FAQs */}
        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${expandedFaq === index ? 'active' : ''}`}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{expandedFaq === index ? '−' : '+'}</span>
              </button>
              {expandedFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="quick-links-section">
          <h3>Quick Links</h3>
          <div className="quick-links">
            <button className="quick-link-btn">Terms of Service</button>
            <button className="quick-link-btn">Privacy Policy</button>
            <button className="quick-link-btn">Shipping Policy</button>
            <button className="quick-link-btn">Refund Policy</button>
          </div>
        </div>

        {/* App Info */}
        <div className="app-info">
          <p>Whatsco India v1.0.0</p>
          <p>© 2025 All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default HelpSupport;
