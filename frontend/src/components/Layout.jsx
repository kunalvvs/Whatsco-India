import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import './Layout.css';

function Layout() {
  const location = useLocation();
  
  const hideHeader = location.pathname === "/reels";
  const hideHeaderChats = location.pathname === "/chat";
  
  return (
    <div className="layout">
      {!hideHeader && !hideHeaderChats && <Header />}
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default Layout;
