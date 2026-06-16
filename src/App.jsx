import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./Componets/Pages/Home";
import Rotlayoute from "./Rotlayoute";
import ProductList from "./Componets/Pages/ProductList";
import CategoryAdd from "./Componets/Pages/CategoryAdd";
import CategoryList from "./Componets/Pages/CategoryList";
import ProductAdd from "./Componets/Pages/ProductAdd";
import OrdersList from "./Componets/Pages/OrdersList";
import ContactList from "./Componets/Pages/ContactList";
import SubscriberList from "./Componets/Pages/SubscriberList";
import Singup from "./Componets/Pages/Singup";
import Login from "./Componets/Pages/Login";
import Sidebar from "./Componets/Layout/Sidebar";
import ProtectedRoute from "./Componets/Pages/ProtectedRoute";
import UserList from "./Componets/Pages/UserList";
import ForgotPassword from "./Componets/Pages/ForgotPassword";
import ResetPassword from "./Componets/Pages/ResetPassword";
import CreactCoupon from "./Componets/Pages/CreactCoupon";
import CouponList from "./Componets/Pages/CouponList";
import VendorList from "./Componets/Pages/VendorList";
import ReviewsList from "./Componets/Pages/ReviewsList";
import Profile from "./Componets/Pages/Profile";
import Wishlist from "./Componets/Pages/Wishlist";
import Notifications from "./Componets/Pages/Notifications";
import Security from "./Componets/Pages/Security";
import Settings from "./Componets/Pages/Settings";
function App() {
  const adminPage = (children) => <ProtectedRoute>{children}</ProtectedRoute>;

  return (
    <>
      <Routes>
        <Route path="/" element={<Rotlayoute />}>
          <Route path="/" element={adminPage(<Home />)} />
          <Route path="/Sidebar" element={adminPage(<Sidebar />)} />
          <Route path="/OrdersList" element={adminPage(<OrdersList />)} />
          <Route path="/ProductAdd" element={adminPage(<ProductAdd />)} />
          <Route path="/ProductList" element={adminPage(<ProductList />)} />
          <Route path="/CategoryAdd" element={adminPage(<CategoryAdd />)} />
          <Route path="/CategoryList" element={adminPage(<CategoryList />)} />
          <Route path="/ContactList" element={adminPage(<ContactList />)} />
          <Route
            path="/SubscriberList"
            element={adminPage(<SubscriberList />)}
          />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Singup" element={<Singup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/UserList" element={adminPage(<UserList />)} />
          <Route path="/CreactCoupon" element={adminPage(<CreactCoupon />)} />
          <Route path="/CouponList" element={adminPage(<CouponList />)} />
          <Route path="/VendorList" element={adminPage(<VendorList />)} />
          <Route path="/ReviewsList" element={adminPage(<ReviewsList />)} />
          <Route path="/Profile" element={adminPage(<Profile />)} />
          <Route path="/Wishlist" element={adminPage(<Wishlist />)} />
          <Route path="/Notifications" element={adminPage(<Notifications />)} />
          <Route path="/Security" element={adminPage(<Security />)} />
          <Route path="/Settings" element={adminPage(<Settings />)} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
