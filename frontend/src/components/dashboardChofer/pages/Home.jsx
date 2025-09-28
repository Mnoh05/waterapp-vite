import React from 'react'
import NavbarChofer from '../../navbar/NavbarChofer'
import { useAuth } from '../../hooks/authContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "../../css/home.css"
import "../../navbar/navbar.css"

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

  const handleSolicitudMaterialesClick = (modulo) => {
    navigate(`/solicitud-materiales/${modulo.nameModulo}`, {
      state: { modulo }
    });
  }
 
  return (
    <div>
        <NavbarChofer />     
              
        <div className='row'  style={{ color: "var(--color-text)" }}>
          <div className='col-md-12'><h4>Bienvenido: {user.nombre.charAt(0).toUpperCase() + user.nombre.slice(1)}</h4></div>
          <div className='col-md-12'><h5>Módulos Asignados</h5></div>
        </div>
      <div className="contenedor pt 4">
        <div className="table-responsive">
        <table className="table table-custom">
          <thead>
            <tr>
              <th>No.</th>
              <th>Módulo</th>
              <th>Botón de Registro</th>
              <th>Registro de Incidencias</th>
              <th>Solicitud de Materiales</th>
            </tr>
          </thead>
          <tbody>
            {modulosDelUsuario.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td><h4>{item.nameModulo}</h4></td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleIniciarClick(item)}>Iniciar</button>
                </td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleRegistrarIncidenciaClick(item)}>Registrar Incidencia</button>
                </td>
                <td>
                  <button className="btn btn-info" onClick={() => handleSolicitudMaterialesClick(item)}>Solicitar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default Home