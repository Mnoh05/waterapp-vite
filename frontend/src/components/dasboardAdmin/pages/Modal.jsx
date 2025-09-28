import React from "react";

function Modal({ mostrar, onClose, modulo }) {

function calcularDuracion(horaLlegada, horaSalida) {
  // Convertimos a objetos Date usando una fecha ficticia
  const inicio = new Date(`1970-01-01T${horaLlegada}`);
  const fin = new Date(`1970-01-01T${horaSalida}`);

  const diffMs = fin - inicio;

  if (isNaN(diffMs) || diffMs < 0) return "0h 0m"; // evita errores

  const horas = Math.floor(diffMs / (1000 * 60 * 60));
  const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${horas}h ${minutos}m`;
}


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
            <div className="modal-body">
              <p>
                <strong>Nombre del módulo:</strong> {modulo.nameModulo}
              </p>

              {modulo.tiempos?.length > 0 ? (
                <table className="table table-custom">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Inicio</th>
                      <th>Fin</th>
                      <th>Tiempo invertido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modulo.tiempos.map((t, i) => (
                      <tr key={i}>
                        <td>{t.fecha.slice(0, 10)}</td>
                        <td>{t.horaLlegada}</td>
                        <td>{t.horaSalida}</td>
                        <td>{calcularDuracion(t.horaLlegada, t.horaSalida)}</td>
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
