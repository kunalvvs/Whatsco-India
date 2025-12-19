import { Link } from 'react-router-dom';
import { 
  FiUser, 
  FiCreditCard, 
  FiBell, 
  FiSettings, 
  FiHelpCircle, 
  FiLogOut, 
  FiChevronRight,
  FiUsers,
  FiShoppingBag
} from 'react-icons/fi';
import './Account.css';

function Account() {
  const menuItems = [
    {
      icon: <FiUser />,
      title: 'Edit Profile',
      description: 'Update your personal info',
      link: '/profile/edit'
    },
    {
      icon: <FiCreditCard />,
      title: 'Payment Methods',
      description: 'Manage your cards',
      link: '/payment-methods'
    },
    {
      icon: <FiBell />,
      title: 'Notifications',
      description: 'Customize alerts',
      link: '/notifications'
    },
    {
      icon: <FiSettings />,
      title: 'Settings',
      description: 'App preferences',
      link: '/settings'
    },
    {
      icon: <FiHelpCircle />,
      title: 'Help & Support',
      description: 'Get assistance',
      link: '/help-support'
    }
  ];

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="account-page">
      {/* User Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar">
          <img 
            src="https://cdn.prod.website-files.com/63900c6064cbc128de0c6227/639b0f7b3749e7f1507c3326_team-img-01.jpg" 
            alt="John Doe" 
          />
        </div>
        <div className="profile-info">
          <h2>John Doe</h2>
          <p className="profile-email">john.doe@example.com</p>
          <p className="profile-member-since">Member since Jan 2024</p>
        </div>
        <Link to="/profile/edit" className="edit-profile-btn">
          Edit Profile
        </Link>
      </div>

      {/* Business Opportunities */}
      <div className="opportunities-section">
        <h3>Business Opportunities</h3>
        <div className="opportunities-grid">
          <div className="opportunity-card">
            <div className="opportunity-icon">
              <FiUsers />
            </div>
            <h4>Become an Associate</h4>
            <p>Join our partner network</p>
          </div>
          <div className="opportunity-card">
            <div className="opportunity-icon">
              <FiShoppingBag />
            </div>
            <h4>Become a Seller</h4>
            <p>Start selling your products</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">5</div>
          <div className="stat-label">Wishlist</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹250</div>
          <div className="stat-label">Credits</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu-section">
        {menuItems.map((item, index) => (
          <Link to={item.link} key={index} className="menu-item">
            <div className="menu-item-icon">
              {item.icon}
            </div>
            <div className="menu-item-content">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
            <FiChevronRight className="menu-item-arrow" />
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        <FiLogOut />
        Log Out
      </button>
    </div>
  );
}

export default Account;
