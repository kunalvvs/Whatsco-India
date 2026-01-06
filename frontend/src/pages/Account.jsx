import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
    // Clear user session/token
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="account-page">
      {/* User Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
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
        </div>
        <button className="edit-profile-btn" onClick={() => window.location.href = '/profile/edit'}>
          Edit Profile
        </button>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/wallet" className="quick-action-card">
          <FiCreditCard />
          <span>My Wallet</span>
        </Link>
        <Link to="/cart" className="quick-action-card">
          <FiShoppingBag />
          <span>My Cart</span>
        </Link>
      </div>

      {/* Business Opportunities */}
      <div className="opportunities-section">
        <h3>Business Opportunities</h3>
        <div className="opportunities-grid">
          <Link to="/associate" className="opportunity-card">
            <div className="opportunity-icon">
              <FiUsers />
            </div>
            <h4>Become an Associate</h4>
            <p>Join our partner network</p>
          </Link>
          <Link to="/become-seller" className="opportunity-card">
            <div className="opportunity-icon">
              <FiShoppingBag />
            </div>
            <h4>Become a Seller</h4>
            <p>Start selling your products</p>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-section">
        <div className="account-stat-card">
          <div className="account-stat-value">12</div>
          <div className="account-stat-label">Orders</div>
        </div>
        <div className="account-stat-card">
          <div className="account-stat-value">5</div>
          <div className="account-stat-label">Wishlist</div>
        </div>
        <div className="account-stat-card">
          <div className="account-stat-value">8</div>
          <div className="account-stat-label">Reviews</div>
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
