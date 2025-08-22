import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/authContext.jsx";
import { useState, useEffect } from "react";

const PrivateRoute = ({allowedRole}) =>{
 //allowedRole es un arreglo que contiene los roles permitidos en este caso solo admin y soporte
    
    const {user, loanding} = useAuth();

    if (loanding) {return <div className="spinner">Verificando sesión...</div>;}

    if (!user) {
    return null;
  }
 
  const userRole = Number(user.role); //covierte ambos datos en numero para la comparacion
  const allowedRoles = allowedRole.map(Number);

      if (!allowedRoles.includes(userRole)){
        return <Navigate to= "/noautorizado" replace/>
        }
    
    return <Outlet />;
}

export default PrivateRoute;

