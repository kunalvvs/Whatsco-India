import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUsers, FiShoppingBag, FiDollarSign, FiPackage,
  FiImage, FiVideo, FiFileText, FiSettings, FiLogOut,
  FiPlus, FiEdit, FiTrash2, FiCheck, FiX, FiUpload,
  FiSearch, FiFilter, FiDownload, FiEye, FiTrendingUp
} from 'react-icons/fi';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // States for different sections
  const [banners, setBanners] = useState([
    { id: 1, title: 'Summer Sale', image: 'https://via.placeholder.com/1200x400', active: true },
    { id: 2, title: 'New Arrivals', image: 'https://via.placeholder.com/1200x400', active: false }
  ]);

  const [reels, setReels] = useState([
    { id: 1, title: 'Product Demo', video: 'demo.mp4', views: 15420, likes: 892, active: true },
    { id: 2, title: 'Tutorial', video: 'tutorial.mp4', views: 8340, likes: 523, active: true }
  ]);

  const [sellerApplications, setSellerApplications] = useState([
    { id: 1, name: 'Rajesh Trading Co.', email: 'rajesh@example.com', phone: '9876543210', status: 'pending', documents: 3, date: '2024-12-25' },
    { id: 2, name: 'Kumar Enterprises', email: 'kumar@example.com', phone: '9876543211', status: 'verified', documents: 3, date: '2024-12-24' },
    { id: 3, name: 'Sharma Store', email: 'sharma@example.com', phone: '9876543212', status: 'rejected', documents: 2, date: '2024-12-23' }
  ]);

  const [promotions, setPromotions] = useState([
    { id: 1, title: 'Flash Sale', discount: '50%', validTill: '2024-12-31', active: true },
    { id: 2, title: 'Festive Offer', discount: '30%', validTill: '2024-12-28', active: true }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 2499, stock: 45, sales: 128, status: 'active', image: 'https://via.placeholder.com/200' },
    { id: 2, name: 'Cotton T-Shirt', category: 'Fashion', price: 499, stock: 0, sales: 256, status: 'out-of-stock', image: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Smart Watch', category: 'Electronics', price: 3999, stock: 23, sales: 89, status: 'active', image: 'https://via.placeholder.com/200' }
  ]);

  // Modal states
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showReelModal, setShowReelModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [viewSellerDocs, setViewSellerDocs] = useState(null);

  // Stats
  const stats = {
    totalUsers: 12458,
    totalOrders: 8523,
    totalRevenue: 4568920,
    totalProducts: products.length,
    pendingSellers: sellerApplications.filter(s => s.status === 'pending').length,
    activeBanners: banners.filter(b => b.active).length,
    totalReels: reels.length,
    activePromotions: promotions.filter(p => p.active).length
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleVerifySeller = (id, action) => {
    setSellerApplications(prev =>
      prev.map(seller =>
        seller.id === id ? { ...seller, status: action === 'verify' ? 'verified' : 'rejected' } : seller
      )
    );
  };

  const toggleBannerStatus = (id) => {
    setBanners(prev =>
      prev.map(banner =>
        banner.id === id ? { ...banner, active: !banner.active } : banner
      )
    );
  };

  const toggleReelStatus = (id) => {
    setReels(prev =>
      prev.map(reel =>
        reel.id === id ? { ...reel, active: !reel.active } : reel
      )
    );
  };

  const getStatusBadge = (status) => {
    const classes = {
      pending: 'admin-status-badge pending',
      verified: 'admin-status-badge verified',
      rejected: 'admin-status-badge rejected',
      active: 'admin-status-badge active',
      'out-of-stock': 'admin-status-badge out-of-stock'
    };
    return classes[status] || 'admin-status-badge';
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Whatsco Admin</h2>
        </div>
        
        <nav className="admin-sidebar-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FiTrendingUp /> Overview
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'banners' ? 'active' : ''}`}
            onClick={() => setActiveTab('banners')}
          >
            <FiImage /> Home Banners
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'reels' ? 'active' : ''}`}
            onClick={() => setActiveTab('reels')}
          >
            <FiVideo /> Reels Management
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'sellers' ? 'active' : ''}`}
            onClick={() => setActiveTab('sellers')}
          >
            <FiFileText /> Seller Verification
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'promotions' ? 'active' : ''}`}
            onClick={() => setActiveTab('promotions')}
          >
            <FiDollarSign /> Promotions
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <FiShoppingBag /> Products
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FiUsers /> Users
          </button>
        </nav>

        <button className="logout-btn-admin" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="admin-header-actions">
            <button className="admin-export-btn">
              <FiDownload /> Export
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-icon users">
                  <FiUsers />
                </div>
                <div className="admin-stat-details">
                  <h3>{stats.totalUsers.toLocaleString()}</h3>
                  <p>Total Users</p>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon orders">
                  <FiShoppingBag />
                </div>
                <div className="admin-stat-details">
                  <h3>{stats.totalOrders.toLocaleString()}</h3>
                  <p>Total Orders</p>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon revenue">
                  <FiDollarSign />
                </div>
                <div className="admin-stat-details">
                  <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
                  <p>Total Revenue</p>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon products">
                  <FiPackage />
                </div>
                <div className="admin-stat-details">
                  <h3>{stats.totalProducts}</h3>
                  <p>Total Products</p>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon pending">
                  <FiFileText />
                </div>
                <div className="admin-stat-details">
                  <h3>{stats.pendingSellers}</h3>
                  <p>Pending Sellers</p>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon banners">
                  <FiImage />
                </div>
                <div className="admin-stat-details">
                  <h3>{stats.activeBanners}/{banners.length}</h3>
                  <p>Active Banners</p>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon reels">
                  <FiVideo />
                </div>
                <div className="admin-stat-details">
                  <h3>{stats.totalReels}</h3>
                  <p>Total Reels</p>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon promotions">
                  <FiDollarSign />
                </div>
                <div className="admin-stat-details">
                  <h3>{stats.activePromotions}</h3>
                  <p>Active Promotions</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Banners Tab */}
        {activeTab === 'banners' && (
          <div className="admin-content-section">
            <div className="admin-section-header">
              <h2>Home Page Banners</h2>
              <button className="admin-add-btn" onClick={() => setShowBannerModal(true)}>
                <FiPlus /> Add Banner
              </button>
            </div>

            <div className="admin-banners-grid">
              {banners.map(banner => (
                <div key={banner.id} className="admin-banner-card">
                  <img src={banner.image} alt={banner.title} />
                  <div className="admin-banner-info">
                    <h3>{banner.title}</h3>
                    <div className="admin-banner-actions">
                      <button 
                        className={`admin-toggle-btn ${banner.active ? 'active' : ''}`}
                        onClick={() => toggleBannerStatus(banner.id)}
                      >
                        {banner.active ? 'Active' : 'Inactive'}
                      </button>
                      <button className="admin-icon-btn edit"><FiEdit /></button>
                      <button className="admin-icon-btn delete"><FiTrash2 /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reels Tab */}
        {activeTab === 'reels' && (
          <div className="admin-content-section">
            <div className="admin-section-header">
              <h2>Reels Management</h2>
              <button className="admin-add-btn" onClick={() => setShowReelModal(true)}>
                <FiPlus /> Upload Reel
              </button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Video</th>
                    <th>Views</th>
                    <th>Likes</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reels.map(reel => (
                    <tr key={reel.id}>
                      <td>#{reel.id}</td>
                      <td>{reel.title}</td>
                      <td>{reel.video}</td>
                      <td>{reel.views.toLocaleString()}</td>
                      <td>{reel.likes}</td>
                      <td>
                        <span className={getStatusBadge(reel.active ? 'active' : 'inactive')}>
                          {reel.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="admin-action-btns">
                          <button className="admin-icon-btn" onClick={() => toggleReelStatus(reel.id)}>
                            {reel.active ? <FiX /> : <FiCheck />}
                          </button>
                          <button className="admin-icon-btn edit"><FiEdit /></button>
                          <button className="admin-icon-btn delete"><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Seller Verification Tab */}
        {activeTab === 'sellers' && (
          <div className="admin-content-section">
            <div className="admin-section-header">
              <h2>Seller Verification Requests</h2>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Business Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Documents</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerApplications.map(seller => (
                    <tr key={seller.id}>
                      <td>#{seller.id}</td>
                      <td>{seller.name}</td>
                      <td>{seller.email}</td>
                      <td>{seller.phone}</td>
                      <td>
                        <button 
                          className="admin-view-docs-btn"
                          onClick={() => setViewSellerDocs(seller)}
                        >
                          <FiEye /> View ({seller.documents})
                        </button>
                      </td>
                      <td>{seller.date}</td>
                      <td>
                        <span className={getStatusBadge(seller.status)}>
                          {seller.status}
                        </span>
                      </td>
                      <td>
                        {seller.status === 'pending' && (
                          <div className="admin-action-btns">
                            <button 
                              className="admin-icon-btn verify"
                              onClick={() => handleVerifySeller(seller.id, 'verify')}
                            >
                              <FiCheck />
                            </button>
                            <button 
                              className="admin-icon-btn reject"
                              onClick={() => handleVerifySeller(seller.id, 'reject')}
                            >
                              <FiX />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Promotions Tab */}
        {activeTab === 'promotions' && (
          <div className="admin-content-section">
            <div className="admin-section-header">
              <h2>Promotion Management</h2>
              <button className="admin-add-btn" onClick={() => setShowPromotionModal(true)}>
                <FiPlus /> Add Promotion
              </button>
            </div>

            <div className="admin-promotions-grid">
              {promotions.map(promo => (
                <div key={promo.id} className="admin-promotion-card">
                  <div className="admin-promo-header">
                    <h3>{promo.title}</h3>
                    <span className={`admin-promo-status ${promo.active ? 'active' : 'inactive'}`}>
                      {promo.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="admin-promo-details">
                    <p className="admin-discount">{promo.discount} OFF</p>
                    <p className="admin-validity">Valid till: {promo.validTill}</p>
                  </div>
                  <div className="admin-promo-actions">
                    <button className="admin-icon-btn edit"><FiEdit /></button>
                    <button className="admin-icon-btn delete"><FiTrash2 /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="admin-content-section">
            <div className="admin-section-header">
              <h2>Product Management</h2>
              <button className="admin-add-btn" onClick={() => setShowProductModal(true)}>
                <FiPlus /> Add Product
              </button>
            </div>

            <div className="admin-products-grid">
              {products.map(product => (
                <div key={product.id} className="admin-product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="admin-product-info">
                    <h3>{product.name}</h3>
                    <p className="admin-category">{product.category}</p>
                    <div className="admin-product-meta">
                      <span className="admin-price">₹{product.price}</span>
                      <span className="admin-stock">Stock: {product.stock}</span>
                    </div>
                    <span className={getStatusBadge(product.status)}>
                      {product.status}
                    </span>
                    <div className="admin-product-actions">
                      <button className="admin-icon-btn edit"><FiEdit /></button>
                      <button className="admin-icon-btn delete"><FiTrash2 /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Banner Upload Modal */}
      {showBannerModal && (
        <div className="admin-modal-overlay" onClick={() => setShowBannerModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Add New Banner</h3>
              <button onClick={() => setShowBannerModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Banner Title</label>
                <input type="text" placeholder="Enter banner title" />
              </div>
              <div className="admin-form-group">
                <label>Upload Image</label>
                <div className="admin-upload-area">
                  <FiUpload />
                  <p>Click to upload or drag and drop</p>
                  <span>PNG, JPG up to 2MB (1200x400 recommended)</span>
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-checkbox-label">
                  <input type="checkbox" />
                  <span>Set as active</span>
                </label>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-cancel-btn" onClick={() => setShowBannerModal(false)}>
                Cancel
              </button>
              <button className="admin-submit-btn">Upload Banner</button>
            </div>
          </div>
        </div>
      )}

      {/* Reel Upload Modal */}
      {showReelModal && (
        <div className="admin-modal-overlay" onClick={() => setShowReelModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Upload New Reel</h3>
              <button onClick={() => setShowReelModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Reel Title</label>
                <input type="text" placeholder="Enter reel title" />
              </div>
              <div className="admin-form-group">
                <label>Upload Video</label>
                <div className="admin-upload-area">
                  <FiUpload />
                  <p>Click to upload or drag and drop</p>
                  <span>MP4, MOV up to 50MB (9:16 vertical recommended)</span>
                </div>
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea rows="3" placeholder="Enter reel description"></textarea>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-cancel-btn" onClick={() => setShowReelModal(false)}>
                Cancel
              </button>
              <button className="admin-submit-btn">Upload Reel</button>
            </div>
          </div>
        </div>
      )}

      {/* Product Add Modal */}
      {showProductModal && (
        <div className="admin-modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="admin-modal large" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Add New Product</h3>
              <button onClick={() => setShowProductModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Product Name</label>
                  <input type="text" placeholder="Enter product name" />
                </div>
                <div className="admin-form-group">
                  <label>Category</label>
                  <select>
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Sports</option>
                    <option>Home & Kitchen</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Price</label>
                  <input type="number" placeholder="0" />
                </div>
                <div className="admin-form-group">
                  <label>Stock Quantity</label>
                  <input type="number" placeholder="0" />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea rows="4" placeholder="Enter product description"></textarea>
              </div>
              <div className="admin-form-group">
                <label>Product Images</label>
                <div className="admin-upload-area">
                  <FiUpload />
                  <p>Click to upload or drag and drop</p>
                  <span>Multiple images supported (PNG, JPG)</span>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-cancel-btn" onClick={() => setShowProductModal(false)}>
                Cancel
              </button>
              <button className="admin-submit-btn">Add Product</button>
            </div>
          </div>
        </div>
      )}

      {/* Seller Documents View Modal */}
      {viewSellerDocs && (
        <div className="admin-modal-overlay" onClick={() => setViewSellerDocs(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Seller Documents - {viewSellerDocs.name}</h3>
              <button onClick={() => setViewSellerDocs(null)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-documents-list">
                <div className="admin-document-item">
                  <FiFileText />
                  <div>
                    <h4>Business Registration Certificate</h4>
                    <button className="admin-view-btn">View Document</button>
                  </div>
                </div>
                <div className="admin-document-item">
                  <FiFileText />
                  <div>
                    <h4>GST Certificate</h4>
                    <button className="admin-view-btn">View Document</button>
                  </div>
                </div>
                <div className="admin-document-item">
                  <FiFileText />
                  <div>
                    <h4>PAN Card</h4>
                    <button className="admin-view-btn">View Document</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-cancel-btn" onClick={() => setViewSellerDocs(null)}>
                Close
              </button>
              <button className="admin-reject-btn">
                <FiX /> Reject
              </button>
              <button className="admin-verify-btn">
                <FiCheck /> Verify Seller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
