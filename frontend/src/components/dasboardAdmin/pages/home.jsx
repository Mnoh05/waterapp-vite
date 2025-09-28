import React from "react";
import Navbar from "../../navbar/Navbar";
import { useAuth } from "../../hooks/authContext.jsx";
import { useState } from "react";
import Modal from "./Modal.jsx";
import "../../css/home.css";

const Home = () => {
  const { modulos, choferes } = useAuth();

  const [moduloSeleccionado, setModuloSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = (modulo) => {
    setModuloSeleccionado(modulo);
    setMostrarModal(true);
  };

  return (
    <div style={{width: "100%"}}>
      <Navbar />
      
      <div className="accordion contenedor" id="accordionExample">
        <div className="text-start"><h2 className="text">Tiempos de los módulos</h2></div>
        {choferes.map((chofer, index) => (
          <div className="accordion-item" key={index} style={{color: "var(--color-text)"}}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="true"
                aria-controls={`collapseOne${index}`}
                style={{color: "var(--color-text)"}}
              >
                Chofer: {chofer.nameUser} {chofer.lastNameUser}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>Modulos Asignados:</strong>
                <ul>
                  {chofer.modulos?.map((modulo, j) => (
                    <li key={j}>
                      <button type="button"className="btn btn-outline-primary mt-2" onClick={() => abrirModal(modulo)}>
                        {modulo.nameModulo}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
        <Modal
          mostrar={mostrarModal}
          onClose={() => setMostrarModal(false)}
          modulo={moduloSeleccionado}
        />
      </div>
    </div>
  );
};

export default Home;
