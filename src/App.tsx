import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./hooks/context/AuthContext";

//admin
import AdminPage from "./modules/admin/ui/AdminPage";

//auth
import ForgotPasswordPage from "./modules/auth/ui/ForgotPasswordPage";
import LoginRegisterPage from "./modules/auth/ui/LoginRegisterPage";
import ResetPasswordPage from "./modules/auth/ui/ResetPasswordPage";

//home
import HomePage from "./modules/home/ui/HomePage";

//seller
import BeSellerPage from "./modules/seller/ui/BeSellerPage";
import CrudProductPage from "./modules/seller/ui/CrudProductPage";
import ProductPage from "./modules/seller/ui/ProductPage";
import RegisterSellerPage from "./modules/seller/ui/RegisterSellerPage";
import SellerPage from "./modules/seller/ui/SellerPage";

//users
import ProfilePage from "./modules/users/ui/ProfilePage";
import ShoppingCartPage from "./modules/users/ui/ShoppingCartPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/loginRegister' element={<LoginRegisterPage />} />
          <Route path='/registerSeller' element={<RegisterSellerPage />} />
          <Route path='/beSellerPage' element={<BeSellerPage />} />
          <Route path='/store/:id' element={<SellerPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/shoppingCart' element={<ShoppingCartPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/resetPassword' element={<ResetPasswordPage />} />
          <Route path='/forgotPassword' element={<ForgotPasswordPage />} />
          <Route path='/crudProduct' element={<CrudProductPage />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
