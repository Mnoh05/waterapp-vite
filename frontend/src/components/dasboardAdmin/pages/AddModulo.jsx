import React from "react";
import Navbar from "../../navbar/Navbar";



const AddModulo = () => {
  return (
    <div>
      <div className="container pt 4">
        <Navbar />
        <form>
          <div className="mb-3">
            <label htmlFor="nameModulos" className="form-label">
              Nombre del Módulo
            </label>
            <input
              type="text"
              className="form-control"
              id="nameModulo"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="latituds" className="form-label">
              Latitud
            </label>
            <input
              type="text"
              className="form-control"
              id="latitud"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="longituds" className="form-label">
              Longitud
            </label>
            <input
              type="text"
              className="form-control"
              id="longitud"
            />
          </div>

          <div class="mb-3">
            <label for="disabledSelect" class="form-label">Chofer</label>
            <select id="disabledSelect" class="form-select">
              <option>Disabled select</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModulo;
