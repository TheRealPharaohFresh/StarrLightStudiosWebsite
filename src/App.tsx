import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import React from 'react'
import LandingPage from './pages/LandingPage'
import NavBar from './components/Navbar'
import Gallery from './pages/Gallery';
import BookingPage from './pages/BookingPage';
import GreetingPage from './pages/GreetingPage';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/Login';
import CheckoutPage from './pages/CheckoutPage';
import ShoppingCart from './pages/ShoppingCartPage';


const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/';

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<GreetingPage />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App
