import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Local & Login - SignUp
import Login_Page from './components/Login_Page';
import Register_Page from './components/Register_Page';
import AboutUs from './components/AboutUs';
import NavBar from './components/NavBar';
import Home_Page from './components/Home_Page';
import Product_Page from './components/Product_Page';

// User
import UserDashboard from './components/UserPage/UserDashboard';
import UserNavBar from './components/UserPage/UserNavBar';
import UserProducts from './components/UserPage/UserProduct';
import UserAbout from './components/UserPage/UserAbout';
import UserCart from './components/UserPage/UserCart';
import Payment from './components/UserPage/Payment';

// Admin
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminNavBar from './components/Admin/AdminNavBar';
import AdminAbout from './components/Admin/AdminAbout';
import AdminProduct from './components/Admin/AdminProduct';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home_Page />} />
          <Route path="login" element={<Login_Page />} />
          <Route path="product" element={<Product_Page />} />
          <Route path="registerPage" element={<Register_Page />} />
          <Route path="about" element={<AboutUs />} />
        </Route>

        <Route path="/UserDashboard" element={<UserNavBar />}>
          <Route index element={<UserDashboard />} />
          <Route path="UserProduct" element={<UserProducts />} />
          <Route path="UserAbout" element={<UserAbout />} />
          <Route path="UserCart" element={<UserCart/>} />
          <Route path="Payment" element={<Payment/>} />
        </Route>

        <Route path='/adminDashboard' element={<AdminNavBar/>}>
            <Route index element={<AdminDashboard/>}/>
            <Route path="AdminAbout" element={<AdminAbout/>}/>
            <Route path="AdminProduct" element={<AdminProduct/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;