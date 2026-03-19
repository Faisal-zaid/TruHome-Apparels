import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "./components/navbar/NavBar";
import Logo from "./components/logo/Logo";
import FeaturedItems from "./components/featured/FeaturedItems";
import Categories from "./components/categories/Categories";
import NewArrivals from "./components/newarrivals/NewArrivals";
import ContactUs from "./components/contact/ContactUs";

import AdminPanel from "./pages/AdminPanel";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";





function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return null;
}

function App() {
  const [showAdmin, setShowAdmin] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  return (
    <Router>
      <ScrollToHash />

      <div className="main">
        <NavBar onAdminLogin={setShowAdmin} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Logo />
                <FeaturedItems />
                <Categories />
                <NewArrivals />
                <ContactUs />
              </>
            }
          />
           
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/:category" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

        
      </div>
    </Router>
  );
}

export default App;