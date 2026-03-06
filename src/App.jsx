import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NavBar from "./components/navbar/NavBar";
import Logo from './components/logo/Logo';
import NewArrivals from './components/newarrivals/NewArrivals';
import ContactUs from './components/contact/ContactUs';
import AdminPanel from './pages/AdminPanel';

import Bathrobes from './pages/Bathrobes';
import Nightdress from './pages/Nightdress';
import Pajamas from './pages/Pajamas';
import Rompers from './pages/Rompers';

function App() {
  const [showAdmin, setShowAdmin] = useState(localStorage.getItem("adminLoggedIn") === "true");

  return (
    <Router>
      <div className="main">
        <NavBar onAdminLogin={setShowAdmin} />
        <Routes>
          <Route path="/" element={<><Logo /><NewArrivals /><ContactUs /></>} />
          <Route path="/pajamas" element={<Pajamas />} />
          <Route path="/nightdress" element={<Nightdress />} />
          <Route path="/rompers" element={<Rompers />} />
          <Route path="/bathrobes" element={<Bathrobes />} />
        </Routes>

        {showAdmin && <AdminPanel />}
      </div>
    </Router>
  );
}

export default App;