import React from 'react'
import Navbar from '../../navbar/Navbar'
import { useAuth } from "../../hooks/authContext.jsx"; 

const ViewChoferes = () => {
const {choferes} = useAuth();

console.log(choferes)
  return (
    <div>
        <Navbar />
              <div className="container pt 4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {choferes.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {item.nameUser + " " + item.lastNameUser}{" "}
                </td>
                <td>{item.email}</td>
                <td>{item.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ViewChoferes