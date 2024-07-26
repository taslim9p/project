
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Signin from "./pages/auth/Signin";
import Register from "./pages/auth/Register";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Profile from "./user/Profile";
import Orders from "./user/Orders";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Searchfunc from "./pages/Searchfunc";
import ProductDetail from "./pages/ProductDetail";
import CategoryDetail from "./pages/CategoryDetail";
import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Reg from "./pages/auth/Reg.jsx";
import AdminOrders from "./pages/admin/AdminOrders";

// import Car from "./components/carousell/Car";

export default function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Searchfunc/>} />
        <Route path="/product/:slug" element={<ProductDetail/>} />
        <Route path="/category/:slug" element={<CategoryDetail/>} />
        <Route path="/cart" element={<CartPage/>} />




        <Route path="dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/orders" element={<AdminOrders/>} />


          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/reg" element={<Reg/>} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
   
  );
}
