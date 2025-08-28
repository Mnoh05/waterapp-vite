import React from "react";
import Navbar from "../../navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/authContext.jsx";

const ViewModulo = () => {
  const { modulos } = useAuth();


  return (
    <div>
      <Navbar />
      <div className="container pt 4">
        <table className="table table-striped table-bordered">
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
