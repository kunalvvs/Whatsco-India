import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiCreditCard, FiPlus, FiArrowUpRight, FiArrowDownLeft, FiDownload, FiCheck } from 'react-icons/fi';
import './Wallet.css';

function Wallet() {
  const { wallet, addWalletTransaction, updateWalletBalance } = useCart();
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const handleAddMoney = (e) => {
    e.preventDefault();
    const amount = parseFloat(addAmount);
    
    if (amount && amount > 0) {
      // Simulate payment processing
      setTimeout(() => {
        updateWalletBalance(wallet.balance + amount);
        addWalletTransaction({
          type: 'credit',
          amount: amount,
          description: `Added via ${selectedMethod.toUpperCase()}`,
          method: selectedMethod
        });
        
        setAddAmount('');
        setShowAddMoney(false);
        alert('Money added successfully!');
      }, 1000);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="wallet-page">
      {/* Balance Card */}
      <div className="wallet-balance-card">
        <div className="balance-header">
          <FiCreditCard className="wallet-icon" />
          <span>Wallet Balance</span>
        </div>
        <div className="balance-amount">
          ₹{wallet.balance.toFixed(2)}
        </div>
        <button 
          className="add-money-btn"
          onClick={() => setShowAddMoney(true)}
        >
          <FiPlus /> Add Money
        </button>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn-wallet">
          <FiArrowUpRight />
          <span>Send</span>
        </button>
        <button className="action-btn-wallet">
          <FiArrowDownLeft />
          <span>Request</span>
        </button>
        <button className="action-btn-wallet">
          <FiDownload />
          <span>Withdraw</span>
        </button>
      </div>

      {/* Transaction History */}
      <div className="transaction-section">
        <h3>Transaction History</h3>
        
        {wallet.transactions.length === 0 ? (
          <div className="no-transactions">
            <FiCreditCard />
            <p>No transactions yet</p>
          </div>
        ) : (
          <div className="transaction-list">
            {wallet.transactions.slice().reverse().map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-icon">
                  {transaction.type === 'credit' ? (
                    <FiArrowDownLeft className="credit-icon" />
                  ) : (
                    <FiArrowUpRight className="debit-icon" />
                  )}
                </div>
                <div className="transaction-details">
                  <h4>{transaction.description}</h4>
                  <span className="transaction-date">
                    {formatDate(transaction.date)}
                  </span>
                  {transaction.orderId && (
                    <span className="transaction-order">
                      Order #{transaction.orderId.slice(0, 8)}
                    </span>
                  )}
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="modal-overlay" onClick={() => setShowAddMoney(false)}>
          <div className="add-money-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Money to Wallet</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddMoney(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddMoney}>
              <div className="amount-input-group">
                <label>Enter Amount</label>
                <div className="amount-input-wrapper">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    placeholder="0"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="quick-amounts">
                {[500, 1000, 2000, 5000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className="quick-amount-btn"
                    onClick={() => setAddAmount(amount.toString())}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="payment-methods">
                <label>Select Payment Method</label>
                <div className="method-options">
                  <label className={`method-option ${selectedMethod === 'upi' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="method"
                      value="upi"
                      checked={selectedMethod === 'upi'}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                    />
                    <span>UPI</span>
                    {selectedMethod === 'upi' && <FiCheck />}
                  </label>
                  
                  <label className={`method-option ${selectedMethod === 'card' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="method"
                      value="card"
                      checked={selectedMethod === 'card'}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                    />
                    <span>Card</span>
                    {selectedMethod === 'card' && <FiCheck />}
                  </label>
                  
                  <label className={`method-option ${selectedMethod === 'netbanking' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="method"
                      value="netbanking"
                      checked={selectedMethod === 'netbanking'}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                    />
                    <span>Net Banking</span>
                    {selectedMethod === 'netbanking' && <FiCheck />}
                  </label>
                </div>
              </div>

              <button type="submit" className="proceed-btn">
                Add ₹{addAmount || '0'} to Wallet
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wallet;
