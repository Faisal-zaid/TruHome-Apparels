import { useState } from 'react'
import Navbar from "./components/navbar/NavBar"
import Logo from './components/logo/Logo'
import './App.css'
import NewArrivals from './components/newarrivals/NewArrivals'
import ContactUs from './components/contact/ContactUs'

function App() {
  

  return (
    <div className='main'>
     <Navbar />
     <Logo />
     <NewArrivals />
     <ContactUs />
    </div>
  )
}

export default App
