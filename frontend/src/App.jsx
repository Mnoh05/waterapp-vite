import { useState } from 'react'
import{Routes, Route} from "react-router-dom";
import Login from './components/login/Login.jsx'
import DashboardAdmin from './components/dasboardAdmin/dasboardAdmin.jsx'
import Dashboard from './components/dashboardChofer/dashboardChofer.jsx'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={< DashboardAdmin/>}/>
        <Route path='/dashboard' element={< Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
