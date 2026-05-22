import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './pages/Login.jsx' 
import  Dashboard from './pages/Dashboard.jsx'
import  Homepage  from './pages/Homepage.jsx'
import {Route,Routes} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Signup from './pages/Signup.jsx'
import ReportIncident from './components/ReportIncident.jsx'
import Reports from './components/Reports.jsx'
import NationalReports from './components/NationalReport.jsx'
import Profile from './components/Profile.jsx'
import SavedReport from './components/SavedReport.jsx'
function App() {
 

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/report-form' element={<ReportIncident/>}/>
        <Route path='/reports' element={<Reports/>}/>
        <Route path='/national-reports' element={<NationalReports/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/savedReport' element={<SavedReport/>}/>
      </Routes>
      
  
    </div>
  )
}

export default App
