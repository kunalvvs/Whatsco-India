import { useState } from 'react';
import './Promotion.css';

function Promotion() {
  const [activeTab, setActiveTab] = useState('All Packages');

  const stats = [
    { icon: '👁️', value: '12.5K', label: 'Total Views' },
    { icon: '✨', value: '847', label: 'Total Clicks' },
    { icon: '▶️', value: '2.3K', label: 'Video Plays' }
  ];

  const packages = [
    {
      id: 1,
      type: 'banner',
      name: 'Banner Basic',
      description: '10,000 banner impressions across the platform',
      price: 499,
      views: '10,000 views',
      icon: '🖼️'
    },
    {
      id: 2,
      type: 'banner',
      name: 'Banner Pro',
      description: '50,000 banner impressions with priority placement',
      price: 1499,
      views: '50,000 views',
      icon: '🖼️'
    },
    {
      id: 3,
      type: 'video',
      name: 'Video Starter',
      description: '5,000 video ad views (30 seconds)',
      price: 999,
      views: '5,000 views',
      duration: '30 sec',
      icon: '🎥'
    },
    {
      id: 4,
      type: 'video',
      name: 'Video Premium',
      description: '20,000 video ad views (60 seconds)',
      price: 2499,
      views: '20,000 views',
      duration: '60 sec',
      icon: '🎥'
    }
  ];

  const tabs = ['All Packages', 'Banner Ads', 'Video Ads', 'PPC Ads'];

  const filteredPackages = activeTab === 'All Packages' 
    ? packages 
    : activeTab === 'Banner Ads' 
    ? packages.filter(p => p.type === 'banner')
    : activeTab === 'Video Ads'
    ? packages.filter(p => p.type === 'video')
    : [];

  return (
    <div className="promotion-page">
      {/* Header */}
      <div className="promotion-header">
        <h1>Promotion Center</h1>
        <p>Grow your business with targeted ads</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Create New Ad Button */}
      <div className="create-ad-section">
        <div className="create-ad-card">
          <div className="create-ad-content">
            <h3>Create New Ad</h3>
            <p>Upload banner or video</p>
          </div>
          <button className="upload-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Upload
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Packages List */}
      <div className="packages-list">
        {filteredPackages.map(pkg => (
          <div key={pkg.id} className="package-card">
            <div className="package-icon">
              <span>{pkg.icon}</span>
            </div>
            <div className="package-info">
              <h3>{pkg.name}</h3>
              <p>{pkg.description}</p>
              <div className="package-meta">
                <span className="views-badge">👁️ {pkg.views}</span>
                {pkg.duration && <span className="duration-badge">⏱️ {pkg.duration}</span>}
              </div>
            </div>
            <div className="package-action">
              <div className="package-price">₹{pkg.price}</div>
              <button className="buy-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Promotion;
