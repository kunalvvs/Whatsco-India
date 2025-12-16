import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shopping from './pages/Shopping';
import Promotion from './pages/Promotion';
import Reels from './pages/Reels';
import './App.css';
import Chat from './pages/Chat';

function App() {

  

  return (
    
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path='/reels' element={<Reels/>} />
          <Route path='/chat' element={<Chat/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
