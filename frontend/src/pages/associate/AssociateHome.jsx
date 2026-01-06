import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, pcvDistribution } from '../../data/associateData';
import { calculateEarningsFromInput, formatCurrency } from '../../utils/pcvCalculations';
import './AssociateHome.css';

function AssociateHome() {
  // Earnings Calculator State
  const [pcvInput, setPcvInput] = useState(1000);
  const [teamMembers, setTeamMembers] = useState({
    l1: 5,
    l2: 10,
    l3: 20,
    l4: 30,
    l5: 50
  });

  // Calculate earnings dynamically
  const earnings = calculateEarningsFromInput(pcvInput, teamMembers);

  const handleSliderChange = (level, value) => {
    setTeamMembers({
      ...teamMembers,
      [level]: parseInt(value)
    });
  };

  // Unilevel percentages for display
  const unilevelPercentages = [
    { level: 'L1', percentage: '40%', color: '#10b981' },
    { level: 'L2', percentage: '20%', color: '#10b981' },
    { level: 'L3', percentage: '16%', color: '#10b981' },
    { level: 'L4', percentage: '14%', color: '#10b981' },
    { level: 'L5', percentage: '10%', color: '#10b981' }
  ];




  return (
    <div className="associate-home">
      {/* Hero Section */}
      <header className="associate-header">
        <div className="header-container">
          <div className="associate-logo">EarnPro</div>
          <div className="header-actions">
          <Link to='/associate/tasks'>  <button className="btn-outline">Task</button> </Link>
           <Link to="/associate/wallet"> <button className="btn-outline">Wallet</button> </Link>
            <button className="btn-outline">Login</button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-badge">💰 Start Today - Start From Today</p>
          <h1 className="hero-title">
            Earn <span className="highlight-green">100% PCV</span> with<br />
            <span className="highlight-orange">Unilevel Structure</span>
          </h1>
          <p className="hero-subtitle">
            Join our platform where 20% of every product sale becomes your Personal<br />
            Commission Volume (PCV) and 100% of that goes distributed through our powerful<br />
            unilevel network structure.
          </p>
          <div className="hero-buttons">
            <button className="ass-btn-primary">Sign Up Free</button>
            <button className="ass-btn-secondary">View Products</button>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-6 h-6 text-primary"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                
              <div className="stat-value">20%</div>
              <div className="stat-label">PCV from MRP</div>
            </div>
            <div className="stat-card">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-6 h-6 text-gold"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <div className="stat-value">100%</div>
              <div className="stat-label">Distribution Rate</div>
            </div>
            <div className="stat-card">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-6 h-6 text-primary"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
              <div className="stat-value">₹5000</div>
              <div className="stat-label">Maintain Balance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Products Section */}
      <section className="products-section">
        <div className="section-container">
          <p className="section-badge">🎁 Great Offers</p>
          <h2 className="section-title">
            Premium Products with <span className="text-green">PCV Benefits</span>
          </h2>
          <p className="section-subtitle">
            Browse our curated selection. Every purchase generates 20% PCV, distributed<br />
            to your upline through 5 levels, making everyone earn!
          </p>

          <div className="ass-products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-badge">20% PCV</div>
                <div className="product-image">
                  <div className="product-image-placeholder"></div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-pricing">
                    <div className="price-item">
                      <span className="price-label">MRP</span>
                      <span className="price-value">{formatCurrency(product.mrp)}</span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">PCV</span>
                      <span className="price-value">{formatCurrency(product.pcv)}</span>
                    </div>
                  </div>

                  {/* Level Earnings */}
                  <div className="level-earnings">
                    {Object.entries(product.levelEarnings).map(([level, amount]) => (
                      <div key={level} className="level-earning-item">
                        <span className={`level-badge ${level}`}>{level.toUpperCase()}</span>
                        <span className="earning-amount">{formatCurrency(amount)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="product-actions">
                    <button className="btn-view-earnings">View Earnings</button>
                    <button className="btn-buy-now">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PCV Distribution Section */}
      <section className="distribution-section">
        <div className="section-container">
          <p className="section-badge">🎯 Simple Structure</p>
          <h2 className="section-title">PCV Distribution Across 5 Levels</h2>
          <p className="section-subtitle">
            How PCV is distributed: 100% of every product's PCV gets distributed across 5 levels in your upline
          </p>

          <div className="distribution-content">
            {/* Associate Unilevel Structure */}
            <div className="unilevel-card">
              <h3 className="unilevel-title">Associate Unilevel Structure</h3>
              <div className="unilevel-icon">⭐</div>
              <div className="unilevel-levels">
                {unilevelPercentages.map((item) => (
                  <div key={item.level} className="unilevel-level">
                    <span className={`level-badge ${item.level.toLowerCase()}`}>{item.level}</span>
                    <span className="level-percentage">{item.percentage}</span>
                  </div>
                ))}
              </div>
              <div className="unilevel-total">
                <span>Total Unilevel:</span>
                <span className="total-value">80%</span>
              </div>
            </div>

            {/* Commission Breakdown */}
            <div className="breakdown-card">
              <h3 className="breakdown-title">Associate Commission Breakdown</h3>
              
              <div className="breakdown-bars">
                <div className="breakdown-item">
                  <div className="breakdown-header">
                    <span className="level-badge l1">Level 1</span>
                    <span className="breakdown-percentage">40%</span>
                  </div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{width: '40%'}}></div>
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-header">
                    <span className="level-badge l2">Level 2</span>
                    <span className="breakdown-percentage">20%</span>
                  </div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{width: '20%'}}></div>
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-header">
                    <span className="level-badge l3">Level 3</span>
                    <span className="breakdown-percentage">16%</span>
                  </div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{width: '16%'}}></div>
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-header">
                    <span className="level-badge l4">Level 4</span>
                    <span className="breakdown-percentage">14%</span>
                  </div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{width: '14%'}}></div>
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-header">
                    <span className="level-badge l5">Level 5</span>
                    <span className="breakdown-percentage">10%</span>
                  </div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{width: '10%'}}></div>
                  </div>
                </div>
              </div>

              {/* Quick Comparison */}
              <div className="quick-comparison">
                <div className="comparison-item">
                  <span className="comparison-label">20% PCV</span>
                  <div className="comparison-box yellow">
                    <span>20% PCV</span>
                  </div>
                </div>
                <div className="comparison-item">
                  <span className="comparison-label">80% PCV</span>
                  <div className="comparison-box green">
                    <span>80% PCV</span>
                  </div>
                </div>
              </div>

              {/* Distribution History */}
              <div className="distribution-history">
                <h4>📊 Distribution History</h4>
                <div className="history-items">
                  {[
                    { name: 'Rahul S.', level: 'Level 1', amount: '₹300', color: '#f59e0b' },
                    { name: 'Priya M.', level: 'Level 2', amount: '₹200', color: '#f59e0b' },
                    { name: 'Amit K.', level: 'Level 3', amount: '₹150', color: '#f59e0b' },
                    { name: 'Neha G.', level: 'Level 4', amount: '₹120', color: '#f59e0b' },
                    { name: 'Vikram P.', level: 'Level 5', amount: '₹100', color: '#f59e0b' }
                  ].map((item, index) => (
                    <div key={index} className="history-item">
                      <div className="history-avatar" style={{backgroundColor: item.color}}></div>
                      <div className="history-details">
                        <div className="history-name">{item.name}</div>
                        <div className="history-level">{item.level}</div>
                      </div>
                      <div className="history-amount">{item.amount}</div>
                    </div>
                  ))}
                </div>
                <button className="btn-view-all">View All Details →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="calculator-section">
        <div className="section-container">
          <p className="section-badge">💰 Earnings Calculator</p>
          <h2 className="section-title">Calculate Your Potential Earnings</h2>
          <p className="section-subtitle">
            See how much you can earn based on team size and product PCV
          </p>

          <div className="calculator-card">
            <div className="calculator-header">
              <span className="calculator-icon">📊</span>
              <h3>Earnings Calculator</h3>
            </div>

            {/* PCV Input */}
            <div className="calculator-input-group">
              <label>Product Base (PCV)</label>
              <div className="input-with-slider">
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={pcvInput}
                  onChange={(e) => setPcvInput(parseInt(e.target.value))}
                  className="range-slider"
                />
                <div className="input-value">{formatCurrency(pcvInput)}</div>
              </div>
            </div>

            {/* Level Sliders */}
            {['l1', 'l2', 'l3', 'l4', 'l5'].map((level) => (
              <div key={level} className="calculator-input-group" data-level={level}>
                <label>
                  <span className={`level-badge ${level}`}>{level.toUpperCase()}</span>
                  <span className="level-name">Team Members ({teamMembers[level]})</span>
                </label>
                <div className="input-with-slider">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={teamMembers[level]}
                    onChange={(e) => handleSliderChange(level, e.target.value)}
                    className="range-slider"
                  />
                  <div className="slider-value">
                    {formatCurrency(earnings.levels[level]?.total || 0)}
                  </div>
                </div>
              </div>
            ))}

            {/* Monthly Earning Breakdown */}
            <div className="earning-breakdown">
              <h4>💰 Monthly Earning Breakdown</h4>
              <div className="breakdown-list">
                {['l1', 'l2', 'l3', 'l4', 'l5'].map((level) => {
                  const data = earnings.levels[level];
                  return (
                    <div key={level} className="breakdown-row">
                      <span className="breakdown-level">{level.toUpperCase()} ({data?.percentage}%)</span>
                      <span className="breakdown-amount">{formatCurrency(data?.total || 0)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Earnings Display */}
            <div className="total-earnings-box">
              <div className="earnings-label">Total Monthly Earnings</div>
              <div className="earnings-amount">{formatCurrency(earnings.grandTotal)}</div>
              <div className="earnings-breakdown-link">
                <span>Potential Earnings:</span>
                <span className="earnings-value">{formatCurrency(earnings.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Earn PCV */}
      <section className="how-to-earn-section">
        <div className="section-container">
          <p className="section-badge">📚 Need To Know</p>
          <h2 className="section-title">How to Earn PCV</h2>

          <div className="earning-methods">
            {/* Customer Method */}
            <div className="method-card customer">
              <div className="method-header">
                <span className="method-badge">50%</span>
                <h3>Customer</h3>
              </div>
              <div className="method-content">
                <p className="method-description">
                  For customers who don't maintain balance
                </p>
                <div className="method-steps">
                  <div className="step">✓ Join for ₹ 5000 or more</div>
                  <div className="step">✓ No monthly balance needed</div>
                  <div className="step">✓ Weekly updated income</div>
                  <div className="step">✓ Buy products - Get PCV</div>
                </div>
                <button className="btn-method">₹10,000+</button>
              </div>
            </div>

            {/* Associate Method */}
            <div className="method-card associate">
              <div className="method-header">
                <span className="method-badge yellow">80%</span>
                <h3>Associate</h3>
              </div>
              <div className="method-content">
                <p className="method-description">
                  For those who maintain balance
                </p>
                <div className="method-steps">
                  <div className="step">✓ Join for ₹ 5000 or more</div>
                  <div className="step">✓ Monthly balance required</div>
                  <div className="step">✓ Unlimited income</div>
                  <div className="step">✓ Complete daily tasks</div>
                </div>
                <button className="btn-method yellow">View Product →</button>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">📦</div>
              <h4>Purchase TNC</h4>
              <ul>
                <li>Orders delivered within 3-5 days</li>
                <li>Complete payment for products</li>
                <li>Review products for community</li>
                <li>No return product policy</li>
              </ul>
            </div>

            <div className="info-card">
              <div className="info-icon">⭐</div>
              <h4>Income Structure</h4>
              <ul>
                <li>Customer: 50% of all level PCV</li>
                <li>Associate: 80% of all level PCV</li>
                <li>Income released on 1st, 11th, 21st</li>
                <li>5 level depth commission</li>
              </ul>
            </div>

            <div className="info-card">
              <div className="info-icon">📊</div>
              <h4>Distribution Process</h4>
              <ul>
                <li>PCV distributed automatically</li>
                <li>Daily earning calculations</li>
                <li>Level-wise commissions</li>
                <li>Instant balance updates</li>
              </ul>
            </div>
          </div>

          {/* Important Note */}
          <div className="important-note">
            <div className="note-icon">⚠️</div>
            <div className="note-content">
              <h4>Important Note</h4>
              <p>
                किसी भी प्रकार का अपडेट एवं खबरों से अवगत होने के लिए निम्नलिखित Telegram channel/groups को जॉइन करें। जिसमें Group 1, Group 2 व WhatsApp Group में जुड़ने की सारी सुविधाएं होंगी। किसी भी प्रकार की समस्याओं का समाधान करने के लिए Help & Support से सम्पर्क करें। ✨ Fake screenshot upload ना करें। करने पर आपका आईडी ब्लॉक होगी।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="associate-footer">
        <div className="footer-container">
          <div className="footer-section">
            <div className="footer-logo">EarnPro</div>
            <p>Join our platform where 20% of every product sale becomes your Personal Commission Volume (PCV)</p>
            <div className="footer-links-inline">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Telegram</a>
              <a href="#">YouTube</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#">Products</a>
            <a href="#">Wallet</a>
            <a href="#">Affiliate</a>
            <a href="#">Shipping</a>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Refund</a>
            <a href="#">Cookie</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 EarnPro. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default AssociateHome;
