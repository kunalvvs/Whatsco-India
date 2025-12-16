import { useState } from 'react';
import './Shopping.css';

function Shopping() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);

  const categories = ['All', 'Wallets', 'Belts', 'Bags', 'Accessories', 'Shoes'];

  const products = [
    {
      id: 1,
      name: 'Classic Leather Wallet',
      price: 1499,
      originalPrice: 2499,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
      category: 'Wallets',
      isNew: true
    },
    {
      id: 2,
      name: 'Premium Leather Belt',
      price: 899,
      originalPrice: 1499,
      rating: 4.6,
      reviews: 89,
      image: 'https://plus.unsplash.com/premium_photo-1726769202190-ad2a3f2f360b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Belts',
      isNew: false
    },
    {
      id: 3,
      name: 'Handcrafted Leather Boots',
      price: 6999,
      originalPrice: 9999,
      rating: 4.9,
      reviews: 287,
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80',
      category: 'Shoes',
      isNew: false
    },
    {
      id: 4,
      name: 'Leather Derby Shoes',
      price: 4499,
      originalPrice: 6999,
      rating: 4.6,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80',
      category: 'Shoes',
      isNew: false
    },
    {
      id: 5,
      name: 'Formal Leather Monk Straps',
      price: 5499,
      originalPrice: 8499,
      rating: 4.8,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80',
      category: 'Shoes',
      isNew: true
    },
    {
      id: 6,
      name: 'Casual Leather Sneakers',
      price: 3999,
      originalPrice: 5999,
      rating: 4.7,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
      category: 'Shoes',
      isNew: false
    }
  ];

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="shopping-page">
      {/* Header Section */}
      <div className="shopping-header">
        <h1>Whatsco India</h1>
        <p className="subtitle">Premium Leather Craft</p>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" placeholder="Search leather products..." />
        </div>
        <button className="cart-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </button>
      </div>

      {/* Categories */}
      <div className="categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            {product.isNew && <span className="new-badge">New</span>}
            <button 
              className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
              onClick={() => toggleFavorite(product.id)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={favorites.includes(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="rating">
                <span className="star">⭐</span>
                <span>{product.rating}</span>
                <span className="reviews">({product.reviews})</span>
              </div>
              <div className="price-section">
                <div className="prices">
                  <span className="price">₹{product.price}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                </div>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopping;
