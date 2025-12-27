import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import './Layout.css';

function Layout() {
  const location = useLocation();
  
  const hideHeader = location.pathname === "/reels";
  const hideHeaderChats = location.pathname === "/chat";
  
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/";
  const isCallPage = location.pathname.startsWith("/voice-call") || location.pathname.startsWith("/video-call");
  
  return (
    <div className="layout">
      {!hideHeader && !hideHeaderChats && !isAuthPage && <Header />}
      <main className={`main-content ${isAuthPage ? 'auth-content' : ''}`}>
        <Outlet />
      </main>
      {!isAuthPage && !isCallPage && <BottomNav />}
    </div>
  );
}

export default Layout;
