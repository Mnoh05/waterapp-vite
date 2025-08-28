import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
import { useState } from "react";

const Navbar = ({onSearch}) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  

  const handleSubmit = (e) => {
    console.log(e,input, "Hola desde la nav")
  e.preventDefault();
  onSearch(input); // Llama a la función del padre
};


  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_usuario");
    localStorage.removeItem("rol_id");

    setUser(null);
    navigate("/");
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/admin/dashboard");
    }
  };
  return (
    <div className="mb-2">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <button
                  className="btn btn-outline-secondary"
                  style={{ border: 'none' }}
                  onClick={handleBack}
                >
                  ← Regresar
                </button>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Choferes
                </a>
                <ul className="dropdown-menu">
                  <li>
                <Link
                  className="dropdown-item"
                  aria-current="page"
                  to="/admin/choferes"
                >
                  Ver choferes
                </Link>
                  </li>
                  <li>
                <Link
                  className="dropdown-item"
                  aria-current="page"
                  to="/admin/agregar-chofer"
                >
                  Agregar Chofer
                </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Módulos
                </a>
                <ul className="dropdown-menu">
                  <li>
                <Link
                  className="dropdown-item"
                  aria-current="page"
                  to="/admin/modulos"
                >
                  Ver módulos
                </Link>
                  </li>
                  <li>
                <Link
                  className="dropdown-item"
                  aria-current="page"
                  to="/admin/agregar-modulo"
                >
                  Agregar Módulo
                </Link>
                  </li>
                  <li>
                <Link
                  className="dropdown-item"
                  aria-current="page"
                  to="/admin/editar-modulo"
                >
                  Editar Módulo
                </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin/incidencias"
                >
                  Incidencias
                </Link>
              </li>
            </ul>

            <form onSubmit={handleSubmit} className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="text"
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                placeholder="Buscar"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>
            <div>
              <button onClick={handleLogOut} className="btn btn-outline-secondary" style={{ border: 'none' }}>Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
