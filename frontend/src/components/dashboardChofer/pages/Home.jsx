import React from 'react'
import NavbarChofer from '../../navbar/NavbarChofer'
import { useAuth } from '../../hooks/authContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
  const { user, modulos } = useAuth();
  const navigate = useNavigate();
  const [moduloSeleccionado, setModuloSeleccionado] = useState(null);

  const modulosDelUsuario = modulos.filter(modulo => modulo.chofer.id === parseInt(user.id));

  const handleIniciarClick = (modulo) => {
   navigate(`/registro-horario/${modulo.nameModulo}`, {
    state: { modulo }
  });

  }
  const handleRegistrarIncidenciaClick = (modulo) => {
    navigate(`/registro-incidencia/${modulo.nameModulo}`, {
     state: { modulo }
   });
  }
 
  return (
    <div>
        <NavbarChofer />
        <h1>Bienvenido{" "}{user.nombre}</h1>
              <h2>Módulos Asignados</h2>
      <div className="container pt 4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Módulo</th>
              <th>Botón de Registro</th>
              <th>Registro de Incidencias</th>
            </tr>
          </thead>
          <tbody>
            {modulosDelUsuario.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nameModulo}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleIniciarClick(item)}>Iniciar</button>
                </td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleRegistrarIncidenciaClick(item)}>Registrar Incidencia</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home