import React from "react";

const ModalFechasSolicitudes = ({ mostrar, onClose, fecha, nombreModulo }) => {
  const soloFecha = fecha?.fecha.slice(0, 10);
  if (!mostrar || !fecha) return null;
  console.log(nombreModulo, "nombre del módulo en modal");
  return (
    <>
      {/* Modal principal */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            {/* Encabezado */}
            <div className="modal-header">
              <h5 className="modal-title">
                Lista de materiales solicitado el {soloFecha} del modulo{" "}
                {nombreModulo}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Cuerpo */}
            <div className="modal-body">
              {fecha.detalles?.length > 0 ? (
                <table className="table table-custom">
                  <thead>
                    <tr>
                      <th>Cantidad</th>
                      <th>Nombre del material</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fecha.detalles.map((t, i) => (
                      <tr key={i}>
                        <td>{t.cantidad}</td>
                        <td>{t.nombre}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted">
                  Este módulo no tiene solicitudes de materiales.
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
};

export default ModalFechasSolicitudes;
