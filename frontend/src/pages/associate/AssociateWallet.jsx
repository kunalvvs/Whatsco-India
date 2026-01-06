import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiAlertTriangle, FiCheckCircle, FiTrendingUp, FiTrendingDown, FiClock } from 'react-icons/fi';
import { walletActivity, associateStats } from '../../data/associateData';
import { formatCurrency, checkIncomeEligibility } from '../../utils/pcvCalculations';
import './AssociateWallet.css';

function AssociateWallet() {
  const navigate = useNavigate();
  const [maintainBalance, setMaintainBalance] = useState(associateStats.currentMaintainBalance);
  const [earningBalance, setEarningBalance] = useState(associateStats.earningBalance);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const requiredBalance = associateStats.maintainBalance;
  const isEligible = checkIncomeEligibility(maintainBalance, requiredBalance);

  const handleTopUp = () => {
    if (topUpAmount && parseFloat(topUpAmount) > 0) {
      setMaintainBalance(maintainBalance + parseFloat(topUpAmount));
      setTopUpAmount('');
      alert(`Successfully added ${formatCurrency(parseFloat(topUpAmount))} to maintain balance!`);
    }
  };

  const handleWithdrawMaintainBalance = () => {
    if (maintainBalance >= requiredBalance) {
      const confirmWithdraw = window.confirm(
        '⚠️ Withdrawing will pause your income eligibility. Are you sure?'
      );
      if (confirmWithdraw) {
        alert('Balance withdrawal initiated. Income will be paused until balance is restored.');
      }
    }
  };

  const handleWithdrawEarnings = () => {
    if (withdrawAmount && parseFloat(withdrawAmount) > 0) {
      if (parseFloat(withdrawAmount) <= earningBalance) {
        setEarningBalance(earningBalance - parseFloat(withdrawAmount));
        setWithdrawAmount('');
        alert(`Successfully withdrew ${formatCurrency(parseFloat(withdrawAmount))}!`);
      } else {
        alert('Insufficient balance!');
      }
    }
  };

  return (
    <div className="associate-wallet-page">
      {/* Header */}
      <div className="wallet-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>My Wallet</h2>
        <div></div>
      </div>
      <p className="wallet-subtitle">Manage your balance & earnings</p>

      <div className="wallet-content">
        {/* Status Banners */}
        <div className="status-banners">
          {/* Associate Badge */}
          <div className="status-banner associate-badge">
            <div className="banner-icon">80%</div>
            <div className="banner-content">
              <h3>Associate 🎊</h3>
              <p>80% PCV distribution • No monthly cap</p>
            </div>
            <div className="banner-badge yellow">UNLIMITED Earnings</div>
          </div>

          {/* Income Status */}
          {isEligible ? (
            <div className="status-banner income-eligible">
              <FiCheckCircle className="status-icon" />
              <div className="banner-content">
                <h3>Income Eligible</h3>
                <p>You are receiving 100% unilevel distribution (No Capping)</p>
              </div>
            </div>
          ) : (
            <div className="status-banner income-paused">
              <FiAlertTriangle className="status-icon" />
              <div className="banner-content">
                <h3>Income Paused!</h3>
                <p>आपको daily tasks complete करने होंगे और ₹5,000 maintain balance hold करना होगा। आपके सारी income missed हो रही है।</p>
              </div>
            </div>
          )}
        </div>

        {/* Balance Cards */}
        <div className="balance-cards">
          {/* Maintain Balance Card */}
          <div className="balance-card maintain-card">
            <div className="card-icon yellow">🔒</div>
            <h3>Maintain Balance</h3>
            <p className="card-subtitle">Required: ₹5,000 minimum</p>
            
            <div className="balance-amount">
              <span className="amount-value">{formatCurrency(maintainBalance)}</span>
              <span className={`balance-status ${maintainBalance < requiredBalance ? 'negative' : 'positive'}`}>
                {maintainBalance < requiredBalance ? '✗ Balance maintained' : '✓ Balance maintained'}
              </span>
            </div>

            {/* Top Up Section */}
            <div className="action-section">
              <label>Enter amount</label>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                />
                <button className="btn-action primary" onClick={handleTopUp}>
                  + Top Up
                </button>
              </div>
            </div>

            {/* Withdraw Button */}
            <button 
              className="btn-withdraw-maintain"
              onClick={handleWithdrawMaintainBalance}
            >
              → Withdraw Maintain Balance
            </button>

            {/* Warning */}
            {maintainBalance < requiredBalance && (
              <div className="warning-message">
                <FiAlertTriangle />
                <span>Withdrawing will pause your income eligibility</span>
              </div>
            )}
          </div>

          {/* Earning Balance Card */}
          <div className="balance-card earning-card">
            <div className="card-icon green">💰</div>
            <h3>Earning Balance</h3>
            <p className="card-subtitle">Unlimited withdrawals allowed</p>
            
            <div className="balance-amount">
              <span className="amount-value">{formatCurrency(earningBalance)}</span>
              <span className="balance-status positive">✓ Available for withdrawal anytime</span>
            </div>

            {/* Withdraw Section */}
            <div className="action-section">
              <label>Enter amount</label>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <button className="btn-action success" onClick={handleWithdrawEarnings}>
                  💳 Withdraw
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="earning-stats">
              <div className="stat-item">
                <div className="stat-number">{associateStats.received}</div>
                <div className="stat-label">Received</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item negative">
                <div className="stat-number">{formatCurrency(associateStats.missed)}</div>
                <div className="stat-label">Missed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Wallet Activity */}
        <div className="wallet-activity-section">
          <div className="activity-header">
            <div className="activity-icon">🕐</div>
            <h3>Recent Wallet Activity</h3>
          </div>

          <div className="activity-list">
            {walletActivity.map((activity) => (
              <div 
                key={activity.id} 
                className={`activity-item ${activity.status === 'missed' ? 'missed' : ''}`}
              >
                <div className="activity-indicator">
                  {activity.type === 'commission' && activity.status === 'completed' && (
                    <div className="indicator-icon green">+</div>
                  )}
                  {activity.status === 'missed' && (
                    <div className="indicator-icon red">⊗</div>
                  )}
                  {activity.type === 'withdrawal' && (
                    <div className="indicator-icon grey">−</div>
                  )}
                </div>

                <div className="activity-details">
                  {activity.type === 'commission' && (
                    <>
                      <h4>
                        {activity.level} Commission - {activity.member}
                      </h4>
                      <p>{activity.date} • {activity.level}</p>
                    </>
                  )}
                  {activity.status === 'missed' && (
                    <>
                      <h4>Missed - Balance not maintained</h4>
                      <p>{activity.date} • {activity.level}</p>
                    </>
                  )}
                  {activity.type === 'withdrawal' && (
                    <>
                      <h4>Withdrawal to Bank</h4>
                      <p>{activity.date}</p>
                    </>
                  )}
                </div>

                <div className={`activity-amount ${activity.amount < 0 ? 'negative' : activity.status === 'missed' ? 'missed-amount' : 'positive'}`}>
                  {activity.amount > 0 ? '+' : ''}{formatCurrency(activity.amount)}
                </div>
              </div>
            ))}
          </div>

          <button 
            className="btn-view-full-history"
            onClick={() => navigate('/associate/transactions')}
          >
            View Full Transaction History
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssociateWallet;
