import { useState } from 'react';
import { 
  FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, 
  FiPackage, FiEye, FiEdit, FiTrash2, FiCheck, FiX,
  FiSearch, FiFilter, FiDownload
} from 'react-icons/fi';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data
  const stats = {
    totalUsers: 12458,
    totalOrders: 8523,
    totalRevenue: 4568920,
    totalProducts: 2341,
    newUsersToday: 124,
    ordersToday: 89,
    revenueToday: 145680,
    pendingOrders: 45
  };

  const recentOrders = [
    { id: 'ORD12345', customer: 'Rahul Kumar', amount: 2499, status: 'pending', date: '2024-01-25' },
    { id: 'ORD12346', customer: 'Priya Sharma', amount: 1899, status: 'delivered', date: '2024-01-25' },
    { id: 'ORD12347', customer: 'Amit Patel', amount: 3499, status: 'processing', date: '2024-01-24' },
    { id: 'ORD12348', customer: 'Sneha Gupta', amount: 1299, status: 'cancelled', date: '2024-01-24' },
    { id: 'ORD12349', customer: 'Vikram Singh', amount: 4599, status: 'delivered', date: '2024-01-23' }
  ];

  const users = [
    { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', orders: 12, spent: 24890, joined: '2023-11-15', status: 'active' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', orders: 8, spent: 15670, joined: '2023-12-02', status: 'active' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', orders: 15, spent: 32450, joined: '2023-10-20', status: 'active' },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', orders: 5, spent: 8920, joined: '2024-01-10', status: 'active' }
  ];

  const products = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 2499, stock: 45, sales: 128, status: 'active' },
    { id: 2, name: 'Cotton T-Shirt', category: 'Fashion', price: 499, stock: 0, sales: 256, status: 'out-of-stock' },
    { id: 3, name: 'Smart Watch', category: 'Electronics', price: 3999, stock: 23, sales: 89, status: 'active' },
    { id: 4, name: 'Running Shoes', category: 'Sports', price: 1899, stock: 67, sales: 145, status: 'active' }
  ];

  const getStatusBadge = (status) => {
    const classes = {
      pending: 'status-badge pending',
      processing: 'status-badge processing',
      delivered: 'status-badge delivered',
      cancelled: 'status-badge cancelled',
      active: 'status-badge active',
      'out-of-stock': 'status-badge out-of-stock'
    };
    return classes[status] || 'status-badge';
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <button className="export-btn">
            <FiDownload />
            Export
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={`tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="tab-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon users">
                <FiUsers />
              </div>
              <div className="stat-details">
                <h3>{stats.totalUsers.toLocaleString()}</h3>
                <p>Total Users</p>
                <span className="stat-growth">+{stats.newUsersToday} today</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orders">
                <FiShoppingBag />
              </div>
              <div className="stat-details">
                <h3>{stats.totalOrders.toLocaleString()}</h3>
                <p>Total Orders</p>
                <span className="stat-growth">+{stats.ordersToday} today</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon revenue">
                <FiDollarSign />
              </div>
              <div className="stat-details">
                <h3>₹{(stats.totalRevenue / 100000).toFixed(1)}L</h3>
                <p>Total Revenue</p>
                <span className="stat-growth">₹{(stats.revenueToday / 1000).toFixed(0)}k today</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon products">
                <FiPackage />
              </div>
              <div className="stat-details">
                <h3>{stats.totalProducts.toLocaleString()}</h3>
                <p>Total Products</p>
                <span className="stat-growth">{stats.pendingOrders} pending orders</span>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td><strong>{order.id}</strong></td>
                      <td>{order.customer}</td>
                      <td>₹{order.amount.toLocaleString()}</td>
                      <td>
                        <span className={getStatusBadge(order.status)}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString('en-IN')}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view"><FiEye /></button>
                          <button className="action-btn edit"><FiEdit /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="tab-content">
          <div className="section">
            <div className="section-toolbar">
              <div className="search-box">
                <FiSearch />
                <input 
                  type="text" 
                  placeholder="Search orders..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="filter-btn">
                <FiFilter />
                Filters
              </button>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td><strong>{order.id}</strong></td>
                      <td>{order.customer}</td>
                      <td>₹{order.amount.toLocaleString()}</td>
                      <td>
                        <span className={getStatusBadge(order.status)}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString('en-IN')}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view"><FiEye /></button>
                          <button className="action-btn edit"><FiEdit /></button>
                          <button className="action-btn delete"><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="tab-content">
          <div className="section">
            <div className="section-toolbar">
              <div className="search-box">
                <FiSearch />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="filter-btn">
                <FiFilter />
                Filters
              </button>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Orders</th>
                    <th>Spent</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td><strong>{user.name}</strong></td>
                      <td>{user.email}</td>
                      <td>{user.orders}</td>
                      <td>₹{user.spent.toLocaleString()}</td>
                      <td>{new Date(user.joined).toLocaleDateString('en-IN')}</td>
                      <td>
                        <span className={getStatusBadge(user.status)}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view"><FiEye /></button>
                          <button className="action-btn edit"><FiEdit /></button>
                          <button className="action-btn delete"><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="tab-content">
          <div className="section">
            <div className="section-toolbar">
              <div className="search-box">
                <FiSearch />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="filter-btn">
                <FiFilter />
                Filters
              </button>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Sales</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td><strong>{product.name}</strong></td>
                      <td>{product.category}</td>
                      <td>₹{product.price.toLocaleString()}</td>
                      <td>
                        <span className={product.stock === 0 ? 'stock-out' : product.stock < 20 ? 'stock-low' : 'stock-good'}>
                          {product.stock}
                        </span>
                      </td>
                      <td>{product.sales}</td>
                      <td>
                        <span className={getStatusBadge(product.status)}>
                          {product.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view"><FiEye /></button>
                          <button className="action-btn edit"><FiEdit /></button>
                          <button className="action-btn delete"><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
