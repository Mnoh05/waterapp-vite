import React from 'react'
import { Link } from 'react-router-dom'

const errorPage = () => {
  return (
    <div>errorPage No puedes entrar aqui \n
        <Link to="/">Login</Link>
    </div>
    
  )
}

export default errorPage