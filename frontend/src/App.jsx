import { useState } from 'react'
import { AuthProvider } from './components/hooks/authContext.jsx';
import{BrowserRouter,Routes, Route} from "react-router-dom";
import Login from './components/login/Login.jsx'
import DashboardAdmin from './components/dasboardAdmin/dasboardAdmin.jsx'
import Dashboard from './components/dashboardChofer/dashboardChofer.jsx'
import ErrorPage from './components/errorPage/errorPage.jsx';
import PrivateRoute from './components/utils/privateRoute.jsx';
import Home from './components/dasboardAdmin/pages/home.jsx';
import Incidencias from './components/dasboardAdmin/pages/Incidencias.jsx';
import ViewModulo from './components/dasboardAdmin/pages/ViewModulo.jsx';
import EditModulo from './components/dasboardAdmin/pages/EditModulo.jsx';
import AddModulo from './components/dasboardAdmin/pages/AddModulo.jsx';
import HomeChofer from './components/dashboardChofer/pages/home.jsx';
import IncidenciasChofer from './components/dashboardChofer/pages/Incidencias.jsx';
import RegistroHorario from './components/dashboardChofer/RegistroHorario.jsx';
import RegistroIncidencia from './components/dashboardChofer/RegistroIncidencia.jsx';

import './App.css'
import AddChofer from './components/dasboardAdmin/pages/AddChofer.jsx';
import ViewChoferes from './components/dasboardAdmin/pages/ViewChoferes.jsx';


function App() {

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='*' element={<ErrorPage/>}/>

        <Route element={< PrivateRoute  allowedRole={["1", "5"]}/>} >
          <Route path="/admin/home" element={< Home/>}/>
          <Route path="/admin/incidencias" element={< Incidencias/>}/>
          <Route path='/admin/modulos' element={ <ViewModulo /> }/>
          <Route path='/admin/editar-modulo' element={ <EditModulo />} />
          <Route path='/admin/agregar-modulo' element={<AddModulo />}/>
          <Route path='/admin/agregar-chofer' element={<AddChofer /> } />
          <Route path='/admin/choferes' element={<ViewChoferes />}/>

        </Route>

        <Route element={< PrivateRoute  allowedRole={["4"]}/>} >
          <Route path='/home' element={< HomeChofer/>}/>
          <Route path='/incidencias' element={< IncidenciasChofer/>}/>
          <Route path='/registro-horario/:moduloName' element={< RegistroHorario />}/> 
          <Route path='/registro-incidencia/:moduloName' element={< RegistroIncidencia />}/>
        </Route>

        
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
