



import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import HomePage from './pages/HomePage';
import ProductByBrand from './pages/ProductByBrand';
import ProductByCategory from './pages/ProductByCategory';
import ProductByKeyword from './pages/ProductByKeyword';
import ProductDetails from './pages/ProductDetails';
import AboutPage from './pages/AboutPage';
import ComplainPage from './pages/ComplainPage';
import ContactPage from './pages/ContactPage';
import HowToBuyPage from './pages/HowToBuyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import TermsPage from './pages/TermsPage';
import LoginPage from './pages/LoginPage';
import OTPPage from './pages/OTPPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import WishPage from './pages/WishPage';
import OrderPage from './pages/OrderPage';
import InvoicePage from './pages/InvoicePage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<HomePage/>} />
        <Route path = "/by-brand/:id" element={<ProductByBrand/>} />
        <Route path = "/by-category/:id" element={<ProductByCategory/>} />
        <Route path = "/by-keyword/:keyword" element={<ProductByKeyword/>} />

        <Route path = "/details/:id" element={<ProductDetails/>} /> 


        <Route path = "/about" element={<AboutPage/>} /> 
        <Route path = "/complain" element={<ComplainPage/>} /> 
        <Route path = "/contact" element={<ContactPage/>} /> 
        <Route path = "/how-to-buy" element={<HowToBuyPage/>} /> 
        <Route path = "/privacy" element={<PrivacyPolicyPage/>} /> 
        <Route path = "/refund" element={<RefundPolicyPage/>} /> 
        <Route path = "/terms" element={<TermsPage/>} /> 
        <Route path = "/login" element={<LoginPage/>} /> 
        <Route path = "/otp" element={<OTPPage/>} /> 
        <Route path = "/profile" element={<ProfilePage/>} /> 
        <Route path = "/cart" element={<CartPage/>} /> 
        <Route path = "/wish" element={<WishPage/>} /> 
        <Route path = "/orders" element={<OrderPage/>} /> 
        <Route path = "/invoice/:id" element={<InvoicePage/>} /> 



      </Routes>
    </BrowserRouter>




  );
};

export default App;