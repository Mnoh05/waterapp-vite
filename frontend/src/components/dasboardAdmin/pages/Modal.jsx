import React from "react";

function Modal({ mostrar, onClose, modulo }) {
  if (!mostrar || !modulo) return null;

  return (
    <>
      {/* Modal principal */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            {/* Encabezado */}
            <div className="modal-header">
              <h5 className="modal-title">Detalles del Módulo</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Cuerpo */}
            <div className="modal-body">
              <p>
                <strong>Nombre del módulo:</strong> {modulo.nameModulo}
              </p>

              {modulo.tiempos?.length > 0 ? (
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Inicio</th>
                      <th>Fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modulo.tiempos.map((t, i) => (
                      <tr key={i}>
                        <td>{t.fecha}</td>
                        <td>{t.horaInicio}</td>
                        <td>{t.horaFin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted">
                  Este módulo no tiene tiempos registrados.
                </p>
              )}
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
    </>
  );
}

export default Modal;
