import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
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
import { useFirebase } from './contexts/Firebase'
import SavedPitches from './pages/SavedPitches'
import MyPitches from './pages/MyPitches'
import MyInvestments from './pages/MyInvestments'
import Feedback from './pages/Feedback'

const App = () => {
  const firebase = useFirebase();
  const location = useLocation();
  const navigate = useNavigate();

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
          <Route path='/account/:role/profile' element={<Profile />} />
          <Route path='/account/:role/create-pitch' element={<UploadPitch />} />
          <Route path='/account/:role/my-pitches' element={<MyPitches />} />
          <Route path='/account/:role/analytics' element={<Analytics />} />
          <Route path='/account/:role/feedback' element={<Feedback />} />
          <Route path='/account/:role/find-pitches' element={<FindPitches />} />
          <Route path="/account/:role/pitch/id/:pitchID" element={<PitchDetails />} />
          <Route path='/account/:role/saved-pitches' element={<SavedPitches />} />
          <Route path='/account/:role/my-investments' element={<MyInvestments />} />
          <Route path='/account/:role/ResetPassword' element={<ResetPassword />} />
        </Route>

      </Routes>
    </StartupProvider>
  );
}

export default App;
