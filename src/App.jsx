import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { StartupProvider } from './contexts/StartupContext'
import ScrollToTop from './components/ScrollToTop'
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ResetPassword from './pages/ResetPassword'
import TermsConditions from './pages/TermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Profile from './pages/Profile'
import UploadPitch from './pages/UploadPitch'
import Analytics from './pages/Analytics'
import FindPitches from './pages/FindPitches'
import PitchDetails from './pages/PitchDetails'
import OtpVerification from './pages/OtpVerification'

const App = () => {
  return (
    <StartupProvider>
      <ScrollToTop />
      <Routes>

        {/* Public Pages Layout */}
        <Route element={<PublicLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/account/login' element={<Login />} />
          <Route path='/account/login/reset-password' element={<ResetPassword />} />
          <Route path='/account/signup' element={<Signup />} />
          <Route path='/account/signup/otp-verification' element={<OtpVerification />} />
          <Route path='/terms-and-conditions' element={<TermsConditions />} />
          <Route path='/privacy-and-policy' element={<PrivacyPolicy />} />
        </Route>

        {/* Dashboard Pages Layout */}
        <Route element={<DashboardLayout />}>
          <Route path='/account/founder/profile' element={<Profile />} />
          <Route path='/account/founder/create-pitch' element={<UploadPitch />} />
          <Route path='/account/founder/analytics' element={<Analytics />} />
          <Route path='/account/investor/find-pitches' element={<FindPitches />} />
          <Route path='/account/investor/find-pitches/pitch-id-11' element={<PitchDetails />} />
        </Route>

      </Routes>
    </StartupProvider>
  );
}

export default App;
