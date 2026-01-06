import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiChevronDown } from 'react-icons/fi';
import { transactions as allTransactions, associateStats } from '../../data/associateData';
import { formatCurrency, getLevelBadgeClass, calculateTotalFromTransactions } from '../../utils/pcvCalculations';
import './TransactionHistory.css';

function TransactionHistory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(allTransactions);

  // Filter transactions based on search, level, and date
  const handleFilter = () => {
    let filtered = [...allTransactions];

    // Search by name
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.member.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by level
    if (selectedLevel !== 'All Levels') {
      filtered = filtered.filter(t => t.level === selectedLevel);
    }

    // Filter by date (simplified - checking if date string contains the filter)
    if (fromDate || toDate) {
      // In real implementation, would parse dates properly
      filtered = filtered.filter(t => {
        // Simplified date filtering logic
        return true;
      });
    }

    setFilteredTransactions(filtered);
  };

  // Calculate totals for filtered transactions
  const totalEarnings = filteredTransactions.reduce((sum, t) => sum + t.earned, 0);
  const totalTransactions = filteredTransactions.length;
  const l1Earnings = filteredTransactions
    .filter(t => t.level === 'L1')
    .reduce((sum, t) => sum + t.earned, 0);
  const l2L5Earnings = filteredTransactions
    .filter(t => t.level !== 'L1')
    .reduce((sum, t) => sum + t.earned, 0);

  return (
    <div className="transaction-history-page">
      {/* Header */}
      <div className="transaction-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Transaction History</h2>
        <div></div>
      </div>
      <p className="transaction-subtitle">View all your 7 transactions</p>

      <div className="transaction-content">
        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card primary">
            <h3>Total Earnings</h3>
            <div className="summary-value">{formatCurrency(totalEarnings)}</div>
          </div>

          <div className="summary-card">
            <h3>Transactions</h3>
            <div className="summary-value">{totalTransactions}</div>
          </div>

          <div className="summary-card">
            <h3>L1 Earnings</h3>
            <div className="summary-value">{formatCurrency(l1Earnings)}</div>
          </div>

          <div className="summary-card">
            <h3>L2-L5 Earnings</h3>
            <div className="summary-value">{formatCurrency(l2L5Earnings)}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <h3 className="filters-title">
            <FiSearch /> Filters
          </h3>

          <div className="filters-grid">
            {/* Search by name */}
            <div className="filter-item">
              <label>Search by name...</label>
              <div className="search-input">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Level dropdown */}
            <div className="filter-item">
              <label>All Levels</label>
              <div className="select-wrapper">
                <select 
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="level-select"
                >
                  <option>All Levels</option>
                  <option>L1</option>
                  <option>L2</option>
                  <option>L3</option>
                  <option>L4</option>
                  <option>L5</option>
                </select>
                <FiChevronDown className="select-icon" />
              </div>
            </div>

            {/* From Date */}
            <div className="filter-item">
              <label>From Date</label>
              <input
                type="date"
                className="date-input"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            {/* To Date */}
            <div className="filter-item">
              <label>To Date</label>
              <input
                type="date"
                className="date-input"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          <button className="btn-apply-filters" onClick={handleFilter}>
            Apply Filters
          </button>
        </div>

        {/* Transactions Table */}
        <div className="transactions-table-section">
          <div className="table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Level</th>
                  <th>Product</th>
                  <th>PCV</th>
                  <th>Earned</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <div className="member-cell">
                          <div className="member-avatar">
                            {transaction.member.charAt(0)}
                          </div>
                          <span>{transaction.member}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`level-badge ${transaction.level.toLowerCase()}`}>
                          {transaction.level}
                        </span>
                      </td>
                      <td className="product-cell">{transaction.product}</td>
                      <td className="pcv-cell">{formatCurrency(transaction.pcv)}</td>
                      <td className="earned-cell">+{formatCurrency(transaction.earned)}</td>
                      <td className="date-cell">{transaction.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View Cards */}
        <div className="transactions-mobile">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-mobile-card">
              <div className="mobile-card-header">
                <div className="member-info">
                  <div className="member-avatar">{transaction.member.charAt(0)}</div>
                  <div>
                    <h4>{transaction.member}</h4>
                    <span className={`level-badge ${transaction.level.toLowerCase()}`}>
                      {transaction.level}
                    </span>
                  </div>
                </div>
                <div className="earned-amount">+{formatCurrency(transaction.earned)}</div>
              </div>
              <div className="mobile-card-details">
                <div className="detail-row">
                  <span className="detail-label">Product</span>
                  <span className="detail-value">{transaction.product}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">PCV</span>
                  <span className="detail-value">{formatCurrency(transaction.pcv)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">{transaction.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
