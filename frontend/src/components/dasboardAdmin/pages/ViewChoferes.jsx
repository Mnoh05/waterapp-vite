import React from "react";
import Navbar from "../../navbar/Navbar";
import { useAuth } from "../../hooks/authContext.jsx";
import { Link } from "react-router-dom";
import "../../css/home.css";

const ViewChoferes = () => {
  const { choferes } = useAuth();

  console.log(choferes);
  return (
    <div>
      <Navbar />
      <div className="contenedor">
        <div className="row p-2">
          <div className="col-md-8">
            <div className="text-start">
              <h2 className="text">Choferes</h2>
            </div>
          </div>
          <div className="col-md-4 col-md-3 d-flex justify-content-end justify-content-lg-start align-items-center">
            {" "}
            <Link
              style={{ color: "white", textDecoration: "none" }}
              className="btn-chico-azul m-2"
              to="/admin/agregar-chofer"
            >
              Agregar Chofer
            </Link>
          </div>
        </div>

        <table className="table table-custom">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {choferes.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nameUser + " " + item.lastNameUser} </td>
                <td>{item.email}</td>
                <td>{item.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewChoferes;
