import React from 'react'

const dashboardChofer = () => {
    const getToken = () => localStorage.getItem('rol_id');
    const rol =getToken();
    console.log(rol, "Quien soy, en dashboard chofer");
    console.log("Holaaa, en dashboard chofer")
  return (
    <div>Hola desde dashboardChofer</div>
  )
}

export default dashboardChofer