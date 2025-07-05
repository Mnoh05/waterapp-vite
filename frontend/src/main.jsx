import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/Login.jsx'

createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
 </React.StrictMode>
)
