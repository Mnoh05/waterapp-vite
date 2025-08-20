import React from 'react'

const dasboardAdmin = () => {
    const getToken = () => localStorage.getItem('rol_id');
    const rol =getToken();
    console.log(rol, "Quien soy, en dashboard admin")
  return (

    <div>dasboardAdmin</div>
  )
}

export default dasboardAdmin