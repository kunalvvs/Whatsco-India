// PCV Calculation Utilities for Associate Module

// Level-wise PCV distribution percentages
export const levelPercentages = {
  l1: 40, // Level 1 gets 40%
  l2: 20, // Level 2 gets 20%
  l3: 16, // Level 3 gets 16%
  l4: 14, // Level 4 gets 14%
  l5: 10  // Level 5 gets 10%
};

/**
 * Calculate earnings for a specific level
 * @param {number} pcv - Product PCV value
 * @param {string} level - Level (l1, l2, l3, l4, l5)
 * @returns {number} Earnings for that level
 */
export const calculateLevelEarnings = (pcv, level) => {
  const percentage = levelPercentages[level.toLowerCase()] || 0;
  return Math.round((pcv * percentage) / 100);
};

/**
 * Calculate total earnings from multiple levels
 * @param {number} pcv - Product PCV value
 * @param {object} teamMembers - Object with team count per level {l1: 5, l2: 10, ...}
 * @returns {object} Total earnings and breakdown
 */
export const calculateTotalEarnings = (pcv, teamMembers) => {
  let total = 0;
  const breakdown = {};

  Object.keys(levelPercentages).forEach(level => {
    const members = teamMembers[level] || 0;
    const earningPerMember = calculateLevelEarnings(pcv, level);
    const levelTotal = earningPerMember * members;
    breakdown[level] = {
      members,
      perMember: earningPerMember,
      total: levelTotal
    };
    total += levelTotal;
  });

  return {
    total,
    breakdown
  };
};

/**
 * Calculate earnings from calculator inputs
 * @param {number} pcv - PCV input value
 * @param {object} teamCounts - Team members per level
 * @returns {object} Detailed earnings calculation
 */
export const calculateEarningsFromInput = (pcv, teamCounts) => {
  const calculations = {};
  let grandTotal = 0;

  Object.entries(levelPercentages).forEach(([level, percentage]) => {
    const members = teamCounts[level] || 0;
    const pcvPerMember = pcv;
    const earningPerMember = (pcvPerMember * percentage) / 100;
    const totalForLevel = earningPerMember * members;

    calculations[level] = {
      percentage,
      members,
      pcvPerMember,
      earningPerMember: Math.round(earningPerMember),
      total: Math.round(totalForLevel)
    };

    grandTotal += totalForLevel;
  });

  return {
    grandTotal: Math.round(grandTotal),
    levels: calculations
  };
};

/**
 * Check if income is eligible based on maintain balance
 * @param {number} currentBalance - Current maintain balance
 * @param {number} requiredBalance - Required minimum balance (default 5000)
 * @returns {boolean} Income eligibility status
 */
export const checkIncomeEligibility = (currentBalance, requiredBalance = 5000) => {
  return currentBalance >= requiredBalance;
};

/**
 * Calculate missed income
 * @param {array} transactions - Array of transaction objects
 * @returns {number} Total missed income amount
 */
export const calculateMissedIncome = (transactions) => {
  return transactions
    .filter(t => t.status === 'missed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
};

/**
 * Calculate received income
 * @param {array} transactions - Array of transaction objects
 * @returns {number} Count of received transactions
 */
export const calculateReceivedCount = (transactions) => {
  return transactions.filter(t => t.type === 'commission' && t.status === 'completed').length;
};

/**
 * Calculate total earnings from transactions
 * @param {array} transactions - Array of transaction objects
 * @param {string} level - Optional: filter by specific level
 * @returns {number} Total earnings
 */
export const calculateTotalFromTransactions = (transactions, level = null) => {
  return transactions
    .filter(t => t.type === 'commission' && t.status === 'completed')
    .filter(t => level ? t.level === level : true)
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Get level badge color class
 * @param {string} level - Level (L1, L2, L3, L4, L5)
 * @returns {string} CSS class name for badge color
 */
export const getLevelBadgeClass = (level) => {
  const badgeMap = {
    'L1': 'level-l1',
    'L2': 'level-l2',
    'L3': 'level-l3',
    'L4': 'level-l4',
    'L5': 'level-l5'
  };
  return badgeMap[level] || 'level-default';
};

/**
 * Format currency to Indian Rupees
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Calculate progress percentage
 * @param {number} completed - Completed count
 * @param {number} total - Total count
 * @returns {number} Percentage (0-100)
 */
export const calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};
