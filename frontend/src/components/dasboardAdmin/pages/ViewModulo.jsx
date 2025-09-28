import React from "react";
import Navbar from "../../navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/authContext.jsx";
import { Link } from "react-router-dom";
import "../../css/home.css";

const ViewModulo = () => {
  const { modulos } = useAuth();
  console.log(modulos, "modulos desde viewmodulo");

  return (
    <div>
      <Navbar />
      <div className="contenedor">
        <div className="row p-2">
          <div className="col-md-6">
            <div className="text-start">
              <h2 className="text">Módulos</h2>
            </div>
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-end">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              className="btn-chico-azul mb-2 mb-md-0"
              to="/admin/agregar-modulo"
            >
              Agregar Módulo
            </Link>
          </div>
          <div className="col-md-3 d-flex justify-content-end justify-content-lg-start align-items-center">
            <Link
              style={{ color: "white", textDecoration: "none",}}
              className="btn-chico-azul "
              to="/admin/editar-modulo"
            >
              Editar Módulo
            </Link>
          </div>
        </div>

        <table className="table table-custom">
          <thead>
            <tr>
              <th>No.</th>
              <th>Módulo</th>
              <th>Chofer</th>
            </tr>
          </thead>
          <tbody>
            {modulos.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nameModulo}</td>
                <td>
                  {item.chofer?.nameUser + " " + item.chofer?.lastNameUser}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewModulo;
