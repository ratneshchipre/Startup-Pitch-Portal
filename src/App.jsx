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
import { StartupProvider } from './contexts/StartupContext'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import UploadPitch from './pages/UploadPitch'
import FindPitches from './pages/FindPitches'
import PitchDetails from './pages/PitchDetails'

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/account/founder");
  const hideFooter = location.pathname.startsWith("/account/founder");
  const showDashboard = location.pathname.startsWith("/account/founder");

  return (
    <StartupProvider>
      <div className='min-h-screen flex flex-col bg-nav-white'>
        {!hideNavbar &&
          <header>
            <Navbar />
          </header>
        }
        {showDashboard &&
          <Dashboard />
        }
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/account/login' element={<Login />} />
            <Route path='/account/login/reset-password' element={<ResetPassword />} />
            <Route path='/account/signup' element={<Signup />} />
            <Route path='/terms-and-conditions' element={<TermsConditions />} />
            <Route path='/privacy-and-policy' element={<PrivacyPolicy />} />
            <Route path='/account/founder/profile' element={<Profile />} />
            <Route path='/account/founder/create-pitch' element={<UploadPitch />} />
            <Route path='/account/investor/find-pitches' element={<FindPitches />} />
            <Route path='/account/investor/find-pitches/pitch-id-11' element={<PitchDetails />} />
          </Routes>
        </main>
        {!hideFooter &&
          <footer>
            <Footer />
          </footer>
        }
      </div>
    </StartupProvider>
  )
}

export default App