import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ScrollTop } from './components/Scroll'
import EmailVerifySuccess from './pages/EmailVerifySuccess'
import Home from './pages/Home'
import EmailVerifyFailed from './pages/EmailVerifyFailed'
import Signup from './pages/Signup'


function App() {

  return (
    <Router>
      <ScrollTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/email-verify-success/:token' element={<EmailVerifySuccess />} />
        <Route path='/email-verify-failed/:token' element={<EmailVerifyFailed />} />
      </Routes>

    </Router>
  )
}

export default App
