import React from "react";
import Navbar from "../../navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from '../../hooks/authContext.jsx';


const AddModulo = () => {
  const {choferes} = useAuth();

const [formulario, setFormulario] = useState({
  nameModulo: '',
  latitud: '',
  longitud: '',
  chofer_id:''
});


const handleChangeFormulario = (e) => { //accion para poder almacenar la informacion de los inputs en el estado de formulario para crear el nuevo modulo
  const { name, value } = e.target;
  
  setFormulario((prev) => ({ ...prev, [name]: value }));
  console.log(formulario) 
};

const handleSubmit = async (e) =>{ //accion que envia la informacion a mi api para crear el modulo
  e.preventDefault();
  const confirmar = window.confirm('¿Estás seguro de que deseas crear este módulo?');
  if (!confirmar) return;

  try {
    const response = await axios.post('http://localhost:3000/api/modulos/crear-modulo', formulario);
    
    alert('Módulo creado');
    setFormulario({ //limpia la informacion
          nameModulo: '',
          latitud: '',
          longitud: '',
          chofer_id:''
        });
  } catch (error) {
     console.error('Error al crear módulo:', error);

  }
}

  return (
    <div>
      <div className="container pt 4">
        <Navbar />
        <h2>Agregar Módulo</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameModulo" className="form-label">
              Nombre del Módulo
            </label>
            <input
              type="text"
              className="form-control"
              name="nameModulo"
              id="nameModulo"
              value={formulario.nameModulo}
              onChange={handleChangeFormulario}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="latitud" className="form-label">
              Latitud
            </label>
            <input
              type="text"
              className="form-control"
              name="latitud"
              id="latitud"
              value={formulario.latitud}
              onChange={handleChangeFormulario}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="longitud" className="form-label">
              Longitud
            </label>
            <input
              type="text"
              className="form-control"
              name="longitud"
              id="longitud"
              value={formulario.longitud}
              onChange={handleChangeFormulario}
            />
          </div>

          {choferes.length > 0 && (
            <div className="mb-3">
              <label htmlFor="chofer_id" className="form-label">Chofer</label>
              <select id="chofer_id" name = "chofer_id" className="form-select"  value={formulario.chofer_id}
              onChange={handleChangeFormulario}>
                <option disabled value="">Selecciona un chofer</option>
                {choferes.map((chofer) => (
                  <option key={chofer.id} value={chofer.id}>
                    {chofer.nameUser}
                  </option>
                ))}
              </select>
            </div>
          )}


          <button type="submit" className="btn btn-primary">
            Crear Módulo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModulo;
