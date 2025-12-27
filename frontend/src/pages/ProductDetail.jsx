import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/dummyData';
import { FiHeart, FiShare2, FiStar, FiShoppingCart, FiCheck, FiTruck, FiShield, FiArrowLeft, FiChevronDown, FiChevronUp, FiMapPin, FiPackage, FiTag } from 'react-icons/fi';
import './ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(productId));
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('IND-8');
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    text: '',
    name: ''
  });
  const [userReviews, setUserReviews] = useState([]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/shopping')}>Back to Shopping</button>
      </div>
    );
  }

  // Generate multiple product images (using same image with different queries for demo)
  const productImages = [
    product.image,
    product.image + '?view=2',
    product.image + '?view=3',
    product.image + '?view=4'
  ];

  const handleAddToCart = () => {
    addToCart(product);
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 3000);
  };

  const handleBuyNow = () => {
    navigate('/checkout', { 
      state: { 
        buyNowProduct: {
          ...product,
          quantity: 1
        }
      } 
    });
  };

  // Touch swipe handlers for image gallery
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && selectedImage < productImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
    
    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.text && newReview.name) {
      const review = {
        id: Date.now(),
        name: newReview.name,
        rating: newReview.rating,
        date: 'Just now',
        text: newReview.text,
        images: []
      };
      setUserReviews([review, ...userReviews]);
      setNewReview({ rating: 5, title: '', text: '', name: '' });
      setShowWriteReview(false);
      setShowAddedNotification(true);
      setTimeout(() => setShowAddedNotification(false), 3000);
    }
  };

  const sizes = ['IND-6', 'IND-7', 'IND-8', 'IND-9', 'IND-10'];

  // Generate related products (Recently Viewed)
  const recentlyViewed = products
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  // Customer reviews data
  const reviews = [
    {
      id: 1,
      name: 'Nihu Chouhan',
      rating: 5,
      date: '7 days ago',
      text: 'Very good product and as a same product jaisa order Kiya wa...',
      images: [product.image, product.image + '?r=2']
    },
    {
      id: 2,
      name: 'Apagou Eimi',
      rating: 5,
      date: '8 days ago',
      text: 'This product is really really amazing😊 Thank You Team Meesho🤩',
      images: [product.image]
    }
  ];

  const ratingBreakdown = {
    excellent: { count: 3666, percentage: 75 },
    veryGood: { count: 639, percentage: 13 },
    good: { count: 416, percentage: 8 },
    average: { count: 112, percentage: 2 },
    poor: { count: 1011, percentage: 2 }
  };

  return (
    <div className="product-detail-page">
      {/* Header */}
      <div className="product-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <div className="header-actions">
          <button className="action-btn">
            <FiShoppingCart />
          </button>
          <button 
            className={`action-btn ${isWishlisted ? 'active' : ''}`}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <FiHeart />
          </button>
          <button className="action-btn">
            <FiShare2 />
          </button>
        </div>
      </div>

      {/* Delivery Location Banner */}
      <div className="delivery-banner">
        <FiMapPin />
        <span>Add delivery location to get extra discount</span>
      </div>

      {/* Image Gallery */}
      <div className="product-gallery">
        <div 
          className="main-image"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img src={productImages[selectedImage]} alt={product.name} />
          <button className="more-like-btn">
            <FiPackage />
            More Like This
          </button>
        </div>
        <div className="image-indicators">
          {productImages.map((_, index) => (
            <div
              key={index}
              className={`indicator ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info-container">
        {/* Seller Badge */}
        <div className="seller-badge">
          <span className="mall-badge">🛍️ Mall</span>
          <span className="seller-name">Layasa New Fashion</span>
        </div>

        <h1 className="product-title">{product.name}</h1>

        {/* Wishlist and Share */}
        <div className="action-buttons">
          <button className="wishlist-share-btn">
            <FiHeart />
            Wishlist
          </button>
          <button className="wishlist-share-btn">
            <FiShare2 />
            Share
          </button>
        </div>

        {/* Price Section */}
        <div className="price-container">
          <span className="current-price">₹{product.price}</span>
          <span className="original-price">₹{(product.price * 1.7).toFixed(0)}</span>
          <span className="discount">70% off</span>
        </div>

        {/* Discount Applied Badge */}
        <div className="discount-applied">
          <FiCheck />
          <span>Discount Applied</span>
        </div>

        {/* Special Offer */}
        <div className="special-offer">
          ₹{(product.price - 50).toFixed(0)} with 1 Special Offer &gt;
        </div>

        {/* Free Delivery */}
        <div className="free-delivery">Free Delivery</div>

        {/* Rating */}
        <div className="rating-badge">
          <FiStar className="star-icon" />
          <span>{product.rating}</span>
          <span className="review-count">(5,844)</span>
        </div>
      </div>

      {/* Service Features */}
      <div className="service-features">
        <div className="service-item">
          <div className="service-icon">🔄</div>
          <div className="service-text">
            <strong>7 Days</strong>
            <span>Easy Return</span>
          </div>
          <div className="service-icon">💵</div>
          <div className="service-text">
            <strong>Cash on</strong>
            <span>Delivery</span>
          </div>

          <div className="service-icon">🏷️</div>
          <div className="service-text">
            <strong>Lowest</strong>
            <span>Price</span>
          </div>
        </div>
       
      </div>

      {/* Size Selection */}
      <div className="size-selection-section">
        <h3>Select Size</h3>
        <div className="size-options-grid">
          {sizes.map(size => (
            <button
              key={size}
              className={`size-option ${selectedSize === size ? 'active' : ''}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Product Highlights */}
      <div className="collapsible-section">
        <div className="section-header" onClick={() => setShowHighlights(!showHighlights)}>
          <h3>Product Highlights</h3>
          {showHighlights ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {showHighlights && (
          <div className="section-content">
            <div className="highlight-grid">
              <div className="highlight-item">
                <span className="label">Color</span>
                <span className="value">Grey</span>
              </div>
              <div className="highlight-item">
                <span className="label">Insole</span>
                <span className="value">Memory foam</span>
              </div>
              <div className="highlight-item">
                <span className="label">Ankle Height</span>
                <span className="value">Regular</span>
              </div>
              <div className="highlight-item">
                <span className="label">Net Quantity (N)</span>
                <span className="value">1</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Details */}
      <div className="collapsible-section">
        <div className="section-header" onClick={() => setShowDetails(!showDetails)}>
          <h3>Additional Details</h3>
          {showDetails ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {showDetails && (
          <div className="section-content">
            <div className="details-list">
              <div className="detail-row">
                <span className="detail-label">Type</span>
                <span className="detail-value">Sneakers</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Material</span>
                <span className="detail-value">Synthetic</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Sole Material</span>
                <span className="detail-value">Rubber</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Pattern</span>
                <span className="detail-value">Solid</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Brand</span>
                <span className="detail-value">Layasa</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Country of Origin</span>
                <span className="detail-value">India</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recently Viewed */}
      <div className="recently-viewed">
        <h3>Recently Viewed</h3>
        <div className="recently-grid">
          {recentlyViewed.map(item => (
            <div key={item.id} className="recently-card" onClick={() => navigate(`/product/${item.id}`)}>
              <img src={item.image} alt={item.name} />
              <p>{item.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Ratings & Reviews */}
      <div className="reviews-container">
        <div className="reviews-header-main">
          <h3>Customer Ratings & Reviews</h3>
          <button className="write-review-btn" onClick={() => setShowWriteReview(true)}>
            ✍️ Write Review
          </button>
        </div>
        
        <div className="rating-overview">
          <div className="rating-score">
            <div className="score-value">{product.rating}★</div>
            <div className="score-meta">
              <div className="total-ratings">5,844 ratings</div>
              <div className="total-reviews">3,278 reviews</div>
            </div>
          </div>
          
          <div className="rating-breakdown">
            <div className="breakdown-item">
              <span className="label">Excellent</span>
              <div className="bar-container">
                <div className="bar" style={{ width: `${ratingBreakdown.excellent.percentage}%` }}></div>
              </div>
              <span className="count">{ratingBreakdown.excellent.count}</span>
            </div>
            <div className="breakdown-item">
              <span className="label">Very Good</span>
              <div className="bar-container">
                <div className="bar" style={{ width: `${ratingBreakdown.veryGood.percentage}%` }}></div>
              </div>
              <span className="count">{ratingBreakdown.veryGood.count}</span>
            </div>
            <div className="breakdown-item">
              <span className="label">Good</span>
              <div className="bar-container">
                <div className="bar" style={{ width: `${ratingBreakdown.good.percentage}%` }}></div>
              </div>
              <span className="count">{ratingBreakdown.good.count}</span>
            </div>
            <div className="breakdown-item">
              <span className="label">Average</span>
              <div className="bar-container">
                <div className="bar average" style={{ width: `${ratingBreakdown.average.percentage}%` }}></div>
              </div>
              <span className="count">{ratingBreakdown.average.count}</span>
            </div>
            <div className="breakdown-item">
              <span className="label">Poor</span>
              <div className="bar-container">
                <div className="bar poor" style={{ width: `${ratingBreakdown.poor.percentage}%` }}></div>
              </div>
              <span className="count">{ratingBreakdown.poor.count}</span>
            </div>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="quality-badges">
          <div className="badge">
            <FiCheck />
            Good Comfort
          </div>
          <div className="badge">
            <FiCheck />
            Good Size/Fit
          </div>
          <div className="badge">
            <FiCheck />
            Good Colour
          </div>
        </div>

        {/* Customer Photos */}
        <div className="customer-photos">
          <h4>Real images and videos from customers</h4>
          <div className="photos-grid">
            {productImages.slice(0, 4).map((img, idx) => (
              <div key={idx} className="photo-item">
                <img src={img} alt={`Customer ${idx + 1}`} />
              </div>
            ))}
            <div className="photo-item more">
              +537
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {[...userReviews, ...reviews].slice(0, showAllReviews ? undefined : 2).map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header-new">
              <div className="review-rating-badge">
                {review.rating}★
                <span>Excellent</span>
              </div>
              <span className="review-date">Posted {review.date}</span>
            </div>
            <p className="review-text-new">{review.text}</p>
            {review.images && review.images.length > 0 && (
              <div className="review-images">
                {review.images.map((img, idx) => (
                  <img key={idx} src={img} alt="Review" />
                ))}
              </div>
            )}
            <div className="reviewer-name">~{review.name}</div>
            <button className="helpful-btn">👍 Helpful</button>
          </div>
        ))}

        {/* View All Reviews Button */}
        {[...userReviews, ...reviews].length > 2 && !showAllReviews && (
          <button className="view-all-reviews-btn" onClick={() => setShowAllReviews(true)}>
            View All {[...userReviews, ...reviews].length} Reviews
          </button>
        )}
        
        {showAllReviews && (
          <button className="view-all-reviews-btn" onClick={() => setShowAllReviews(false)}>
            Show Less
          </button>
        )}
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="review-modal-overlay" onClick={() => setShowWriteReview(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Write a Review</h3>
              <button className="close-modal" onClick={() => setShowWriteReview(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Your Rating</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= newReview.rating ? 'filled' : ''}`}
                      onClick={() => setNewReview({...newReview, rating: star})}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Review Title (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Amazing product!"
                  value={newReview.title}
                  onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  placeholder="Share your experience with this product..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                  rows="5"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowWriteReview(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-review-btn">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="bottom-action-bar">
        <button className="buy-now-btn-single" onClick={handleBuyNow}>
          ▶▶ Buy Now
        </button>
      </div>

      {/* Added to Cart Notification */}
      {showAddedNotification && (
        <div className="added-notification">
          <FiCheck />
          <span>Added to cart!</span>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
