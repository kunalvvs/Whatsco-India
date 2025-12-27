import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiCreditCard, FiDollarSign, FiTruck, FiCheck } from 'react-icons/fi';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, getCartTotal, clearCart, wallet, addWalletTransaction, updateWalletBalance } = useCart();
  
  // Check if this is a single product purchase (Buy Now)
  const buyNowProduct = location.state?.buyNowProduct;
  const checkoutItems = buyNowProduct ? [buyNowProduct] : cart;
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = buyNowProduct 
    ? buyNowProduct.price * buyNowProduct.quantity
    : getCartTotal();
  const tax = subtotal * 0.18;
  const shipping = subtotal >= 499 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate wallet payment
    if (paymentMethod === 'wallet') {
      if (wallet.balance < total) {
        alert('Insufficient wallet balance. Please add money to your wallet or choose another payment method.');
        return;
      }
    }

    // Process payment
    if (paymentMethod === 'wallet') {
      // Deduct from wallet
      updateWalletBalance(wallet.balance - total);
      addWalletTransaction({
        type: 'debit',
        amount: total,
        description: 'Order payment',
        orderId: 'ORD' + Date.now()
      });
    }

    // Simulate order placement
    setTimeout(() => {
      // Only clear cart if this is a cart checkout, not Buy Now
      if (!buyNowProduct) {
        clearCart();
      }
      setOrderPlaced(true);
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    }, 1000);
  };

  if (checkoutItems.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-icon">
          <FiCheck />
        </div>
        <h2>Order Placed Successfully!</h2>
        <p>Your order will be delivered soon</p>
        <p className="redirect-note">Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Shipping Information */}
        <div className="form-section">
          <h2>
            <FiTruck />
            Shipping Information
          </h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address"
                required
              />
            </div>

            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
            </div>

            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="6-digit pincode"
                pattern="[0-9]{6}"
                required
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="form-section">
          <h2>
            <FiCreditCard />
            Payment Method
          </h2>

          <div className="payment-methods">
            <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FiCreditCard /> <span>Credit/Debit Card</span>
              
            </label>

            <label className={`payment-option ${paymentMethod === 'wallet' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="wallet"
                checked={paymentMethod === 'wallet'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FiDollarSign />
              <span>Wallet (₹{wallet.balance.toFixed(2)})</span>
            </label>

            <label className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FiTruck />
              <span>Cash on Delivery</span>
            </label>
          </div>

          {/* Card Details */}
          {paymentMethod === 'card' && (
            <div className="card-details">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="16"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Cardholder Name *</label>
                  <input
                    type="text"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardInputChange}
                    placeholder="Name on card"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Expiry Date *</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Wallet Warning */}
          {paymentMethod === 'wallet' && wallet.balance < total && (
            <div className="wallet-warning">
              ⚠️ Insufficient balance. Please add ₹{(total - wallet.balance).toFixed(2)} to your wallet.
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="order-summary-section">
          <h2>Order Summary</h2>
          
          <div className="summary-items">
            {checkoutItems.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
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
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
