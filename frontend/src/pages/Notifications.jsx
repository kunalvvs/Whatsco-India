import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBell, FiMail, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';
import './Notifications.css';

function Notifications() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newProducts: false,
    priceDrops: true,
    chatMessages: true,
    emailNotifications: false,
    pushNotifications: true,
    smsNotifications: false
  });

  const handleToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const notificationGroups = [
    {
      title: 'Order Notifications',
      items: [
        {
          key: 'orderUpdates',
          icon: <FiShoppingBag />,
          label: 'Order Updates',
          description: 'Get notified about order status changes'
        }
      ]
    },
    {
      title: 'Marketing',
      items: [
        {
          key: 'promotions',
          icon: <FiTrendingUp />,
          label: 'Promotions & Offers',
          description: 'Exclusive deals and discounts'
        },
        {
          key: 'newProducts',
          icon: <FiShoppingBag />,
          label: 'New Products',
          description: 'Latest arrivals and collections'
        },
        {
          key: 'priceDrops',
          icon: <FiTrendingUp />,
          label: 'Price Drops',
          description: 'Alerts for price reductions'
        }
      ]
    },
    {
      title: 'Communication',
      items: [
        {
          key: 'chatMessages',
          icon: <FiBell />,
          label: 'Chat Messages',
          description: 'New messages from sellers'
        }
      ]
    },
    {
      title: 'Notification Channels',
      items: [
        {
          key: 'emailNotifications',
          icon: <FiMail />,
          label: 'Email Notifications',
          description: 'Receive updates via email'
        },
        {
          key: 'pushNotifications',
          icon: <FiBell />,
          label: 'Push Notifications',
          description: 'App notifications on your device'
        },
        {
          key: 'smsNotifications',
          icon: <FiMail />,
          label: 'SMS Notifications',
          description: 'Text messages for important updates'
        }
      ]
    }
  ];

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <button className="back-btn" onClick={() => navigate('/account')}>
          <FiArrowLeft />
        </button>
        <h2>Notifications</h2>
        <div></div>
      </div>

      <div className="notifications-content">
        {notificationGroups.map((group, index) => (
          <div key={index} className="notification-group">
            <h3 className="group-title">{group.title}</h3>
            {group.items.map((item) => (
              <div key={item.key} className="notification-item">
                <div className="notification-icon">{item.icon}</div>
                <div className="notification-info">
                  <h4>{item.label}</h4>
                  <p>{item.description}</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={() => handleToggle(item.key)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
