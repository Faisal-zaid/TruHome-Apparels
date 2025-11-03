import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/navbar/NavBar"
import Logo from './components/logo/Logo'
import './App.css'
import NewArrivals from './components/newarrivals/NewArrivals'
import ContactUs from './components/contact/ContactUs'

import Bathrobes from './pages/Bathrobes'
import Nightdress from './pages/Nightdress'
import Pajamas from './pages/Pajamas'
import Rompers from './pages/Rompers'

function App() {
  

  return (
    <div className='main'>
     <Navbar />
     <Routes>
       <Route path="/" element={<><Logo /><NewArrivals /><ContactUs /></>} />
        <Route path="/pajamas" element={<Pajamas />} />
        <Route path="/nightdress" element={<Nightdress />} />
        <Route path="/rompers" element={<Rompers />} />
        <Route path="/bathrobes" element={<Bathrobes />} />
     </Routes>
     
    </div>
  )
}

export default App
