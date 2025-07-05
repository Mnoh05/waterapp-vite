import React from "react";
import logo from "../../assets/login/logo-login.jpg";
import styles from "./Login.module.css"; // Assuming you have a CSS module for styles
const Login = () => {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      
      style={{ minHeight: "100vh"}}
    >
      <div className="card mb-3" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="row g-0">
          <div className="col-md-5 d-flex align-items-center">
            <img src={logo} className="img-fluid rounded" alt="..." />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">Bienvenido</h5>
              <form>
                <label>Usuario</label>
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Usuario"
                  aria-label="Usuario"
                />
                <br />
                <label>Contraseña</label>
                <input
                  className="form-control me-2"
                  type="password"
                  placeholder="Contraseña"
                  aria-label="Contraseña"
                />
                <br />
                <button className="btn btn-primary w-50" type="submit">
                  Acceder
                </button>
              </form>
              <p className="card-text mt-3">
                <div className="login-right">
                  <hr />
                  <p>¿Perdiste tu contraseña?</p>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
