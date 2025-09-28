import React from "react";
import { useState } from "react";
import ModalFechasSolicitudes from "./ModalFechasSolicitudes";

const ModalSolicitudes = ({ mostrar, onClose, modulo }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreModulo, setNombreModulo] = useState("");
  const abrirModal = (solicitudes) => {
    console.log(solicitudes, "solicitudes en modal");
    setFechaSeleccionada(solicitudes);
    setNombreModulo(modulo.nameModulo);
    setMostrarModal(true);
  };

  if (!mostrar || !modulo) return null;
  console.log(modulo, "modulo en modal");
  return (
    <>
      {/* Modal principal */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            {/* Encabezado */}
            <div className="modal-header">
              <h5 className="modal-title">Solicitudes</h5>
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

              {modulo.solicitudes?.length > 0 ? (
                <table className="table table-custom">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Ver Solicitud</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modulo.solicitudes.map((t, i) => (
                      <tr key={i}>
                        <td>{t.fecha.slice(0, 10)}</td>
                        <td>
                          {" "}
                          <button
                            type="button"
                            className="btn btn-outline-primary mt-2"
                            onClick={() => abrirModal(t)}
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted">
                  Este módulo no tiene solicitudes de materiales.
                </p>
              )}
              <ModalFechasSolicitudes
                mostrar={mostrarModal}
                onClose={() => setMostrarModal(false)}
                fecha={fechaSeleccionada}
                nombreModulo={nombreModulo}
              />
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

export default ModalSolicitudes;
