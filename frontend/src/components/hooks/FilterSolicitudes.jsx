import React from "react";
import dayjs from "dayjs";
import { useState } from "react";
import ModalSolicitudes from "../dasboardAdmin/pages/ModalSolicitudes";
const FilterSolicitudes = ({ searchItem, solicitudes }) => {
  console.log(solicitudes, "materiales desde filterSolicitudes ");
  const [moduloSeleccionado, setModuloSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = (modulo) => {
    setModuloSeleccionado(modulo);
    setMostrarModal(true);
  };

  const normaliza = (texto) =>
    (texto ?? "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filtro = solicitudes.filter((item) => item.nameModulo === searchItem);
  console.log(filtro, "materiales filtrados");
  const haySolicitudes = Array.isArray(filtro) && filtro.length > 0; //para evitar el valor null del array
  return (
    <div>
      <div className="container pt 4">
        {haySolicitudes ? (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Módulo</th>
              </tr>
            </thead>
            <tbody>
              {filtro.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-outline-primary mt-2"
                      onClick={() => abrirModal(item)}
                    >
                      {item.nameModulo}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Módulo</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-outline-primary mt-2"
                      onClick={() => abrirModal(item)}
                    >
                      {item.nameModulo}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <ModalSolicitudes
          mostrar={mostrarModal}
          onClose={() => setMostrarModal(false)}
          modulo={moduloSeleccionado}
        />
      </div>
    </div>
  );
};

export default FilterSolicitudes;
