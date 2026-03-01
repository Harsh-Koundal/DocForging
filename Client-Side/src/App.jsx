import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ScrollTop } from './components/Scroll'
import EmailVerifySuccess from './pages/EmailVerifySuccess'
import Home from './pages/Home'


function App() {

  return (
    <Router>
      <ScrollTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify-success/:token' element={<EmailVerifySuccess />} />
      </Routes>

    </Router>
  )
}

export default App
