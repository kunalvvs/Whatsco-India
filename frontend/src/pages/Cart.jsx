import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal >= 499 ? 0 : 50;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <FiShoppingCart className="empty-icon" />
        <h2>Your cart is empty</h2>
        <p>Add items to get started</p>
        <Link to="/shopping" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart ({cart.length} items)</h1>
      
      <div className="cart-container">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price}</p>
                
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <FiMinus />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
              
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Tax (18%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
          </div>
          
          {subtotal < 499 && (
            <div className="shipping-note">
              Add ₹{(499 - subtotal).toFixed(2)} more for free shipping
            </div>
          )}
          
          <div className="summary-divider"></div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          
          <button 
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
            <FiArrowRight />
          </button>
          
          <Link to="/shopping" className="continue-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
