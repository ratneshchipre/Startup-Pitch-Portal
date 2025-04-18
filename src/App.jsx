import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/Login'
import { Route, Routes, useLocation } from 'react-router-dom'
import Signup from './pages/Signup'
import TermsConditions from './pages/TermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/account/founder");
  const hideFooter = location.pathname.startsWith("/account/founder");

  return (
    <div className='min-h-screen flex flex-col bg-nav-white'>
      {!hideNavbar &&
        <header>
          <Navbar />
        </header>
      }
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account/login' element={<Login />} />
          <Route path='/account/login/reset-password' element={<ResetPassword />} />
          <Route path='/account/signup' element={<Signup />} />
          <Route path='/terms-and-conditions' element={<TermsConditions />} />
          <Route path='/privacy-and-policy' element={<PrivacyPolicy />} />
        </Routes>
      </main>
      {!hideFooter &&
        <footer>
          <Footer />
        </footer>
      }
    </div>
  )
}

export default App