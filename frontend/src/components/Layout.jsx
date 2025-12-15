import { useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();
  
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

export default Layout;
