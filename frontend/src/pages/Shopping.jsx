import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Shopping.css';
import { products } from '../data/dummyData';

function Shopping() {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [addedToCart, setAddedToCart] = useState(null);

  const categories = ['All', 'Wallets', 'Belts', 'Bags', 'Accessories', 'Shoes'];

  

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="shopping-page">
      {/* Header Section */}
      <div className="shopping-header">
        <h1>Whatsco India</h1>
        <p className="subtitle">Premium Leather Craft More</p>
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
        <Link to="/cart" className="cart-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </Link>
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
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: 'pointer' }}
          >
            {product.isNew && <span className="new-badge">New</span>}
            <button 
              className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product.id);
              }}
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
                <button 
                  className={`add-to-cart-btn ${addedToCart === product.id ? 'added' : ''}`}
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  {addedToCart === product.id ? '✓ Added' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopping;
