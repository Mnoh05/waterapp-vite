import { useState } from 'react'
import{BrowserRouter,Routes, Route} from "react-router-dom";
import Login from './components/login/Login.jsx'
import DashboardAdmin from './components/dasboardAdmin/dasboardAdmin.jsx'
import Dashboard from './components/dashboardChofer/dashboardChofer.jsx'
import ErrorPage from './components/errorPage/errorPage.jsx';
import PrivateRoute from './components/utils/privateRoute.jsx';
import Home from './components/dasboardAdmin/pages/home.jsx';
import { AuthProvider } from './components/hooks/authContext.jsx';


import './App.css'

function App() {

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='*' element={<ErrorPage/>}/>

        <Route element={< PrivateRoute  allowedRole={["1", "5"]}/>} >
          <Route path="/admin/dashboard" element={< DashboardAdmin/>}/>
          <Route path="/admin/home" element={< Home/>}/>
        </Route>

        <Route element={< PrivateRoute  allowedRole={["4"]}/>} >
          <Route path='/dashboard' element={< Dashboard/>}/>
        </Route>

        
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
