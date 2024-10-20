import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/login';
import Cart from './pages/Cart';
import UserComponent from './pages/User';
import Menu from './pages/Menu';
import Register from './pages/register';
import User from './pages/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop /> {/* Scrolls to the top on route change */}
        <Navbar />
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='login' element={<Login />} />
          <Route path='cart' element={<Cart />} />
          <Route path='user' element={<UserComponent />} />
          <Route path='menu' element={<Menu />} />
          <Route path='register' element={<Register />} />
          <Route path='user' element={<User />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

// ScrollToTop component inside App.js
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default App;
