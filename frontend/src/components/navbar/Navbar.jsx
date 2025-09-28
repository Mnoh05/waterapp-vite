import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
import { useState } from "react";
import "./navbar.css";

const Navbar = ({ onSearch }) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

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
    <div className="mb-2 ">
      <nav className="navbar navbar-expand-lg  text-nav">
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
              <li>

              </li>
              <li className="nav-item">
                <Link
                style={{ color: "var(--color-text)" }}
                  className="nav-link active"
                  aria-current="page"
                  to="/admin/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  style={{ color: "var(--color-text)" }}
                  className="nav-link "
                  aria-current="page"
                  to="/admin/choferes"
                >
                  Choferes
                </Link>
              </li>
              <li className="nav-item dropdown">
               <Link
                  style={{ color: "var(--color-text)" }}
                  className="nav-link "
                  aria-current="page"
                  to="/admin/modulos"
                >
                  Módulos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin/incidencias"
                  style={{ color: "var(--color-text)" }}
                >
                  Incidencias
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin/solicitud-materiales"
                  style={{ color: "var(--color-text)" }}
                >
                  Solicitud de Materiales
                </Link>
              </li>
            </ul>
            <div>
              <button
                onClick={handleLogOut}
                className="btn btn-outline-secondary"
                style={{ border: "none", color: "var(--color-text)" }}

              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
