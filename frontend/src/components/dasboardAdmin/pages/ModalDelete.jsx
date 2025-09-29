import React from "react";
import "../../css/home.css";
import axios from "axios";

const ModalDelete = ({ mostrar, onClose, usuario }) => {
    console.log("usuairoo i", usuario.id)
  if (!mostrar || !usuario || !usuario.id) return null;

  const handleDelete = async (id) => {
    
    const confirmacion = window.confirm(
      "¿Seguro que desea eliminar este usuario, una vez eliminado no se podrá revertir?"
    );
    

    if (confirmacion) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/login/users/${id}`
        );
        if (response.status === 200) {
          alert("Usuario eliminado correctamente!!");
          window.location.reload();
          onClose();
        }else{
            alert("Ocurrio un error al momento de eliminar el usuario")
        }
      } catch (error) {
        alert("Error con la conexión al servidor")
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Cerrar</button>
        <h2>Lista de Usuarios</h2>
        <p>{usuario.usuario}</p>
        <p>{usuario.lastNameUser}</p>
      </div>

      {/* Modal principal */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            {/* Encabezado */}
            <div className="modal-header">
              <h5 className="modal-title">Detalles del usuario a eliminar</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mb-4">
                <div className="col-md-6">{usuario.usuario}</div>
                <div className="col-md-6">{usuario.lastNameUser}</div>
              </div>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
                <div className="col-md-4 d-flex justify-content-center">
                  <button
                    className="btn btn-danger"
                    style={{ color: "white" }}
                    onClick={() => handleDelete(usuario.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop oscuro */}
      <div className="modal-backdrop fade show"></div>
    </div>
  );
};

export default ModalDelete;
