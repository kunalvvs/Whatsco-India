import { useState } from 'react';
import { FiCopy, FiShare2, FiUsers, FiDollarSign, FiTrendingUp, FiGift, FiCheckCircle } from 'react-icons/fi';
import './BecomeAssociate.css';

function BecomeAssociate() {
  const [referralCode] = useState('WHATSCO' + Math.random().toString(36).substr(2, 6).toUpperCase());
  const [copied, setCopied] = useState(false);

  // Dummy stats data
  const stats = {
    totalReferrals: 24,
    activeReferrals: 18,
    totalEarnings: 12450,
    pendingEarnings: 2300,
    thisMonthEarnings: 3800
  };

  // Dummy referral data
  const referrals = [
    { id: 1, name: 'Rahul Kumar', date: '2024-01-15', status: 'active', earnings: 500 },
    { id: 2, name: 'Priya Sharma', date: '2024-01-18', status: 'active', earnings: 650 },
    { id: 3, name: 'Amit Patel', date: '2024-01-20', status: 'pending', earnings: 0 },
    { id: 4, name: 'Sneha Gupta', date: '2024-01-22', status: 'active', earnings: 420 }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferral = () => {
    const text = `Join Whatsco and get amazing deals! Use my referral code: ${referralCode}`;
    if (navigator.share) {
      navigator.share({
        title: 'Join Whatsco',
        text: text,
        url: window.location.origin
      });
    } else {
      alert('Share: ' + text);
    }
  };

  return (
    <div className="become-associate-page">
      {/* Hero Section */}
      <div className="associate-hero">
        <div className="hero-content">
          <h1>Become an Associate</h1>
          <p>Earn money by referring customers and grow your income</p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <h2>Why Join Our Associate Program?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <FiDollarSign />
            </div>
            <h3>Earn Commission</h3>
            <p>Get up to 10% commission on every successful referral purchase</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">
              <FiGift />
            </div>
            <h3>Bonus Rewards</h3>
            <p>Special bonuses for top performers and milestone achievements</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">
              <FiTrendingUp />
            </div>
            <h3>Growing Income</h3>
            <p>Unlimited earning potential with recurring commissions</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">
              <FiUsers />
            </div>
            <h3>Easy Sharing</h3>
            <p>Simple referral process with multiple sharing options</p>
          </div>
        </div>
      </div>

      {/* Referral Code Section */}
      <div className="referral-section">
        <div className="referral-card">
          <h3>Your Referral Code</h3>
          <div className="code-container">
            <div className="code-box">
              <span className="code">{referralCode}</span>
              <button 
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={copyReferralCode}
              >
                {copied ? <FiCheckCircle /> : <FiCopy />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button className="share-btn" onClick={shareReferral}>
              <FiShare2 />
              Share Code
            </button>
          </div>
          <p className="referral-note">
            Share this code with friends and family. They get benefits, you earn commission!
          </p>
        </div>
      </div>

      {/* Stats Section */}
      
      <div className="stats-section">
       
        <div className="stats-grid">
          
          <div className="stat-card">
            <FiUsers className="stat-icon" />
            <div className="stat-details">
              <h4>{stats.totalReferrals}</h4>
              <p>Total Referrals</p>
            </div>
          </div>
          
          <div className="stat-card">
            <FiCheckCircle className="stat-icon" />
            <div className="stat-details">
              <h4>{stats.activeReferrals}</h4>
              <p>Active Referrals</p>
            </div>
          </div>
          
          <div className="stat-card highlight">
            <FiDollarSign className="stat-icon" />
            <div className="stat-details">
              <h4>₹{stats.totalEarnings.toLocaleString()}</h4>
              <p>Total Earnings</p>
            </div>
          </div>
          
          <div className="stat-card">
            <FiTrendingUp className="stat-icon" />
            <div className="stat-details">
              <h4>₹{stats.thisMonthEarnings.toLocaleString()}</h4>
              <p>This Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="earnings-section">
        <div className="earnings-card">
          <h3>Earnings Breakdown</h3>
          <div className="earnings-summary">
            <div className="earning-row">
              <span>Available Balance</span>
              <span className="amount success">₹{(stats.totalEarnings - stats.pendingEarnings).toLocaleString()}</span>
            </div>
            <div className="earning-row">
              <span>Pending Approval</span>
              <span className="amount warning">₹{stats.pendingEarnings.toLocaleString()}</span>
            </div>
            <div className="earning-row total">
              <span>Total Earnings</span>
              <span className="amount">₹{stats.totalEarnings.toLocaleString()}</span>
            </div>
          </div>
          <button className="withdraw-btn">
            Withdraw Earnings
          </button>
        </div>
      </div>

      {/* Referrals List */}
      <div className="referrals-section">
        <h3>Your Referrals</h3>
        <div className="referrals-list">
          {referrals.map(referral => (
            <div key={referral.id} className="referral-item">
              <div className="referral-avatar">
                {referral.name.charAt(0)}
              </div>
              <div className="referral-info">
                <h4>{referral.name}</h4>
                <span className="referral-date">
                  Joined: {new Date(referral.date).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <div className="referral-earnings">
                <span className={`status ${referral.status}`}>
                  {referral.status === 'active' ? 'Active' : 'Pending'}
                </span>
                <span className="earnings">₹{referral.earnings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works">
        <h3>How It Works</h3>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h4>Share Your Code</h4>
            <p>Share your unique referral code with friends and family</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">2</div>
            <h4>They Sign Up</h4>
            <p>When they register using your code and make a purchase</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">3</div>
            <h4>You Earn</h4>
            <p>Get commission on their purchases credited to your account</p>
          </div>
        </div>
      </div>

      {/* Commission Structure */}
      <div className="commission-section">
        <h3>Commission Structure</h3>
        <div className="commission-table">
          <div className="commission-row">
            <span>First Purchase</span>
            <span className="rate">10%</span>
          </div>
          <div className="commission-row">
            <span>Recurring Purchases (Month 1-3)</span>
            <span className="rate">7%</span>
          </div>
          <div className="commission-row">
            <span>Recurring Purchases (Month 4+)</span>
            <span className="rate">5%</span>
          </div>
          <div className="commission-row highlight">
            <span>Bonus for 10+ Active Referrals</span>
            <span className="rate">+2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeAssociate;
