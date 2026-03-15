import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import NavBar from "./components/navbar/NavBar";
import Logo from "./components/logo/Logo";
import FeaturedItems from "./components/featured/FeaturedItems";
import Categories from "./components/categories/Categories";
import NewArrivals from "./components/newarrivals/NewArrivals";
import ContactUs from "./components/contact/ContactUs";

import AdminPanel from "./pages/AdminPanel";
//import Bathrobes from "./pages/Bathrobes";
//import Nightdress from "./pages/Nightdress";
//import Pajamas from "./pages/Pajamas";
//import Rompers from "./pages/Rompers";

import ProductsPage from "./pages/ProductsPage"; // 

function App() {
  const [showAdmin, setShowAdmin] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  return (
    <Router>
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

          <Route path="/:category" element={<ProductsPage />} />
        </Routes>

        {showAdmin && <AdminPanel />}
      </div>
    </Router>
  );
}

export default App;