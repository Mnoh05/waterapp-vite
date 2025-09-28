import React from "react";
import Navbar from "../../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterIncidencias from "../../hooks/FilterIncidencias";
import "../../css/home.css";

const Incidencias = ({ onSearch }) => {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const allIncidencias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/incidencia"
        );
        setIncidencias(response.data);
      } catch (error) {
        console.error(
          "Error al obtener incidencias:",
          error.response?.data?.message || error.message
        );
      } finally {
        //siempre se ejecuta haya o no error
        setLoading(false);
      }
    };
    allIncidencias();
  }, []);

  const handleSearch = (valor) => {
    setSearchItem(valor);
  };

  const handleAll = () => {
    setSearchItem(null);
    <FilterIncidencias searchItem={searchItem} incidencias={incidencias} />;
  };

  const handleSubmit = (e) => {
    console.log(e, input, "Hola desde la nav");
    e.preventDefault();
    onSearch(input); // Llama a la función del padre
  };

  const hayIncidencias = Array.isArray(incidencias) && incidencias.length > 0; //para evitar el valor null del array
  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex justify-content-end justify-content-lg-end align-items-center">
            <button
              onClick={handleAll}
              className="btn-chico-azul"
              style={{ color: "white" }}
            >
              Todas las incidencias
            </button>
          </div>
          <div className="col-md-4">
            <form onSubmit={handleSubmit} className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setSearchItem(e.target.value);
                }}
                placeholder="Buscar"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                style={{ color: "var(--color-text)" }}
                type="submit"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      </div>

      <FilterIncidencias searchItem={searchItem} incidencias={incidencias} />
    </div>
  );
};

export default Incidencias;
