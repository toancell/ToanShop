import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/user/HomePage";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import Product from "./pages/user/Product.jsx";
import Login from "./pages/user/Login";
import NewProduct from "./pages/user/NewProduct";
import Signup from "./pages/user/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ChatAdmin from "./pages/admin/ChatAdmin";
import UserDashboard from "./pages/admin/UserDashboard";
import CreateProduct from "./pages/admin/CreateProduct";
import CreateCategories from "./pages/admin/CreateCategories.jsx";
import SearchResult from "./pages/user/SearchResult.jsx";
import SingleProduct from "./pages/user/SingleProduct.jsx";
import Magazine from "./pages/user/Magazine.jsx";
import SingleMagazine from "./pages/user/SingleMagazine.jsx";
import Cart from "./pages/user/Cart.jsx";
function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product/>} />
        <Route path="/product/:slug" element={<SingleProduct/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/newproduct" element={<NewProduct />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="dashboard" element={<AdminDashboard/>} />
        <Route path="dashboard/chatadmin" element={<ChatAdmin/>} />
        <Route path="dashboard/create-product" element={<CreateProduct />}/>
        <Route path="dashboard/create-categories" element={<CreateCategories/>} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/magazine" element={<Magazine/>} />
        <Route path="/magazine/:slug" element={<SingleMagazine/>}/>
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </>
  );
}

export default App;
