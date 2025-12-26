import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

function Header() {
  const { wallet, getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="logo">Whatsco</h1>
        </Link>
         <Link to="/" className="notification-btn">
         
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                
               <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              {/* <path d="M9 2L7 6M15 2l2 4M6 6h12l1 11H5L6 6z"></path> */}
            </svg>
            <span className="notification-badge">3</span>
          </Link>
        
      </div>
      <div className="header-actions">
          <Link to="/wallet" className="wallet-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <span>₹{wallet.balance.toFixed(0)}</span>
          </Link>
         
          <button className="notification-btn1">
           🔔
          </button>
        </div>
    </header>
  );
}

export default Header;
