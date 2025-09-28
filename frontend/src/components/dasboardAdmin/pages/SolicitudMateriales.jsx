import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../navbar/Navbar.jsx";
import FilterSolicitudes from "../../hooks/FilterSolicitudes";

const SolicitudMateriales = () => {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const allSolicitudes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/solicitudMaterial"
        );
        setMateriales(response.data);
      } catch (error) {
        console.error(
          "Error al obtener solicitudes:",
          error.response?.data?.message || error.message
        );
      } finally {
        //siempre se ejecuta haya o no error
        setLoading(false);
      }
    };
    allSolicitudes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleAll = () => {
    setSearchItem(null);
    <FilterSolicitudes searchItem={searchItem} solicitudes={materiales} />;
  };

  const handleSearch = (valor) => {
    setSearchItem(valor);
  };
  const handleSubmit = (e) => {
    console.log(e, input, "Hola desde la nav");
    e.preventDefault();
    onSearch(input); // Llama a la función del padre
  };

  const hayMateriales = Array.isArray(materiales) && materiales.length > 0;

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
              Todas las solicitudes
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
      <FilterSolicitudes searchItem={searchItem} solicitudes={materiales} />
    </div>
  );
};

export default SolicitudMateriales;
