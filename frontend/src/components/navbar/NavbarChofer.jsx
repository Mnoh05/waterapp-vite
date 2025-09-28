import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
import { useState } from "react";
import "./navbar.css";

const NavbarChofer = ({onSearch}) => {
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
      <nav className="navbar navbar-expand-lg text-nav">
        <div className="container-fluid">

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
              {/* <li>
                <button
                  className="btn btn-outline-secondary"
                  style={{ border: 'none', color:"white" }}
                 
                >
                  ← Regresar
                </button>
              </li> */}
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                  style={{ color: "var(--color-text)" }}
                >
                  Home
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/incidencias"
                >
                  Registro de Incidencias
                </Link>
              </li> */}
            </ul>
            <div>
              <button onClick={handleLogOut} className="btn btn-outline-secondary" style={{ border: 'none' }}>Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarChofer;