import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shopping from './pages/Shopping';
import Promotion from './pages/Promotion';
import Reels from './pages/Reels';
import Account from './pages/Account';
import Chat from './pages/Chat';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wallet from './pages/Wallet';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatMessages from './pages/ChatMessages';
import VideoCall from './pages/VideoCall';
import VoiceCall from './pages/VoiceCall';
import ProductDetail from './pages/ProductDetail';
import BecomeSeller from './pages/BecomeSeller';
import BecomeAssociate from './pages/BecomeAssociate';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* All Routes - With Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/home' element={<Home/>} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:chatId" element={<ChatMessages />} />
            <Route path="/video-call/:contactId" element={<VideoCall />} />
            <Route path="/voice-call/:contactId" element={<VoiceCall />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
            <Route path="/become-associate" element={<BecomeAssociate />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
