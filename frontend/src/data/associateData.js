// Mock data for Associate Module

export const products = [
  {
    id: 1,
    name: 'Premium Skincare Collection',
    image: '/assets/product1.jpg',
    mrp: 2500,
    pcv: 500,
    levelEarnings: {
      l1: 200,
      l2: 100,
      l3: 80,
      l4: 70,
      l5: 50
    }
  },
  {
    id: 2,
    name: 'Wellness Vitamin Supplements',
    image: '/assets/product2.jpg',
    mrp: 1800,
    pcv: 360,
    levelEarnings: {
      l1: 144,
      l2: 72,
      l3: 58,
      l4: 50,
      l5: 36
    }
  },
  {
    id: 3,
    name: 'Organic Essential Oils Set',
    image: '/assets/product3.jpg',
    mrp: 2200,
    pcv: 440,
    levelEarnings: {
      l1: 176,
      l2: 88,
      l3: 70,
      l4: 62,
      l5: 44
    }
  },
  {
    id: 4,
    name: 'Luxury Hair Care Kit',
    image: '/assets/product4.jpg',
    mrp: 2800,
    pcv: 560,
    levelEarnings: {
      l1: 224,
      l2: 112,
      l3: 90,
      l4: 78,
      l5: 56
    }
  }
];

export const pcvDistribution = {
  l1: 40, // 40%
  l2: 20, // 20%
  l3: 16, // 16%
  l4: 14, // 14%
  l5: 10  // 10%
};

export const transactions = [
  {
    id: 1,
    member: 'Rahul Sharma',
    level: 'L1',
    product: 'Premium Wellness Kit',
    pcv: 1000,
    earned: 250,
    date: '16 Dec 2024, 03:30 PM'
  },
  {
    id: 2,
    member: 'Priya Mehta',
    level: 'L2',
    product: 'Organic Health Pack',
    pcv: 1000,
    earned: 200,
    date: '16 Dec 2024, 11:15 AM'
  },
  {
    id: 3,
    member: 'Amit Kumar',
    level: 'L3',
    product: 'Premium Wellness Kit',
    pcv: 1000,
    earned: 250,
    date: '16 Dec 2024, 04:45 PM'
  },
  {
    id: 4,
    member: 'Neha Reddy',
    level: 'L3',
    product: 'Fitness Bundle Pro',
    pcv: 1000,
    earned: 150,
    date: '16 Dec 2024, 10:00 AM'
  },
  {
    id: 5,
    member: 'Vikram Patel',
    level: 'L2',
    product: 'Organic Health Pack',
    pcv: 1000,
    earned: 200,
    date: '17 Dec 2024, 09:30 AM'
  },
  {
    id: 6,
    member: 'Sunita Verma',
    level: 'L2',
    product: 'Beauty Essentials',
    pcv: 1000,
    earned: 150,
    date: '17 Dec 2024, 03:20 PM'
  },
  {
    id: 7,
    member: 'Deepak Singh',
    level: 'L1',
    product: 'Premium Wellness Kit',
    pcv: 1000,
    earned: 250,
    date: '16 Dec 2024, 12:00 PM'
  },
  {
    id: 8,
    member: 'Kavita Joshi',
    level: 'L5',
    product: 'Starter Pack',
    pcv: 1000,
    earned: 80,
    date: '16 Dec 2024, 08:45 AM'
  },
  {
    id: 9,
    member: 'Ravi Gupta',
    level: 'L2',
    product: 'Organic Health Pack',
    pcv: 1000,
    earned: 200,
    date: '15 Dec 2024, 02:10 PM'
  },
  {
    id: 10,
    member: 'Anita Chauhan',
    level: 'L1',
    product: 'Fitness Bundle Pro',
    pcv: 1000,
    earned: 150,
    date: '15 Dec 2024, 11:20 AM'
  },
  {
    id: 11,
    member: 'Manish Tiwari',
    level: 'L3',
    product: 'Premium Wellness Kit',
    pcv: 1000,
    earned: 250,
    date: '14 Dec 2024, 05:00 PM'
  },
  {
    id: 12,
    member: 'Pooja Yadav',
    level: 'L2',
    product: 'Beauty Essentials',
    pcv: 1000,
    earned: 150,
    date: '14 Dec 2024, 09:15 AM'
  },
  {
    id: 13,
    member: 'Sanjay Mishra',
    level: 'L1',
    product: 'Organic Health Pack',
    pcv: 1000,
    earned: 200,
    date: '13 Dec 2024, 01:45 PM'
  },
  {
    id: 14,
    member: 'Rekha Agarwal',
    level: 'L5',
    product: 'Starter Pack',
    pcv: 1000,
    earned: 80,
    date: '13 Dec 2024, 10:30 AM'
  },
  {
    id: 15,
    member: 'Ajay Pandey',
    level: 'L1',
    product: 'Fitness Bundle Pro',
    pcv: 1000,
    earned: 150,
    date: '12 Dec 2024, 04:20 PM'
  }
];

export const walletActivity = [
  {
    id: 1,
    type: 'commission',
    level: 'L1',
    member: 'Rahul Sharma',
    amount: 500,
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: 2,
    type: 'commission',
    level: 'L2',
    member: 'Priya Singh',
    amount: 400,
    date: '2024-01-14',
    status: 'completed'
  },
  {
    id: 3,
    type: 'commission',
    level: 'L3',
    member: 'Amit Kumar',
    amount: 300,
    date: '2024-01-13',
    status: 'completed'
  },
  {
    id: 4,
    type: 'missed',
    level: 'L1',
    member: 'Balance not maintained',
    amount: 250,
    date: '2024-01-12',
    status: 'missed'
  },
  {
    id: 5,
    type: 'commission',
    level: 'L4',
    member: 'Neha Gupta',
    amount: 240,
    date: '2024-01-11',
    status: 'completed'
  },
  {
    id: 6,
    type: 'withdrawal',
    member: 'Withdrawal to Bank',
    amount: -2000,
    date: '2024-01-10',
    status: 'completed'
  }
];

export const dailyTasks = [
  {
    id: 1,
    title: 'Daily Login',
    description: 'Login to your account daily',
    completed: false,
    mandatory: true
  },
  {
    id: 2,
    title: 'View Products',
    description: 'Browse at least 3 products',
    completed: false,
    mandatory: true
  },
  {
    id: 3,
    title: 'Share on Social Media',
    description: 'Share any product on social media',
    completed: false,
    mandatory: true
  },
  {
    id: 4,
    title: 'Check Wallet Balance',
    description: 'View your wallet section',
    completed: false,
    mandatory: true
  },
  ...Array.from({length: 10}, (_, i) => ({
    id: i + 5,
    title: `Send referral link to Friend ${i + 1}`,
    description: 'Send referral link & upload screenshot',
    completed: false,
    mandatory: false
  }))
];

export const associateStats = {
  level: 'Associate',
  pcvPercentage: 80,
  monthlyCapRemoved: true,
  incomeEligible: false, // Based on maintain balance
  maintainBalance: 5000,
  currentMaintainBalance: 3500,
  earningBalance: 12450,
  received: 4,
  missed: 250,
  totalEarnings: 2660,
  l1Earnings: 1000,
  l2Earnings: 1650,
  totalTransactions: 15
};
