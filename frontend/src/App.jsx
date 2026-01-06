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
import VideoCall from './pages/VideoCall';
import VoiceCall from './pages/VoiceCall';
import ProductDetail from './pages/ProductDetail';
import BecomeSeller from './pages/BecomeSeller';
// import BecomeAssociate from './pages/BecomeAssociate';
import ContactSelectionPage from './pages/ContactSelectionPage';
import EditProfile from './pages/EditProfile';
import PaymentMethods from './pages/PaymentMethods';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import HelpSupport from './pages/HelpSupport';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AssociateHome from './pages/associate/AssociateHome';
import AssociateWallet from './pages/associate/AssociateWallet';
import DailyTasks from './pages/associate/DailyTasks';
import TransactionHistory from './pages/associate/TransactionHistory';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Admin Routes - Without Layout */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Associate Routes - Without Layout */}
          <Route path="/associate" element={<AssociateHome />} />
          <Route path="/associate/home" element={<AssociateHome />} />
          <Route path="/associate/wallet" element={<AssociateWallet />} />
          <Route path="/associate/tasks" element={<DailyTasks />} />
          <Route path="/associate/transactions" element={<TransactionHistory />} />

          {/* User Routes - With Layout */}
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
            <Route path="/contact-selection" element={<ContactSelectionPage />} />
            <Route path="/video-call/:contactId" element={<VideoCall />} />
            <Route path="/voice-call/:contactId" element={<VoiceCall />} />
            <Route path="/account" element={<Account />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
            {/* <Route path="/become-associate" element={<BecomeAssociate />} /> */}
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
