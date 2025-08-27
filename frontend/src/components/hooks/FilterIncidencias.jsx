import React from 'react'
import dayjs from 'dayjs';
const FilterIncidencias = ({searchItem, incidencias}) => {
     
    
    const normaliza = (texto) => (texto ?? '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    
 
  
    
        const filtro = incidencias.filter((item) => 
        
            item.modulo.nameModulo === searchItem
            
        );

    console.log(filtro, "holissss")
   
    const hayIncidencias = Array.isArray(filtro) && filtro.length > 0; //para evitar el valor null del array
  return (
    <div>
      <div className="container pt 4">
        <p className="fs-2"> Incidencias filtradas</p>
        {
         hayIncidencias ? (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                          
                          <th>Id Incidencia</th>
                          <th>Módulo</th>
                          <th>Chofer</th>
                          <th>Descripcion</th>
                          <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        { filtro.map((item, index)=> (
                            <tr key={item.id}>
                                <td>{index  + 1}</td>
                                <td>{item.modulo?.nameModulo}</td>
                                <td>{item.modulo?.chofer.nameUser + ' ' + item.modulo?.chofer.lastNameUser} </td>
                                <td>{item.description}</td>
                                {/* <td>{item.updatedAt}</td> */}
                                <td>{dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                            </tr>
                        ))

                        }
                    </tbody>
                </table>
            ) : (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                          
                          <th>Id Incidencia</th>
                          <th>Módulo</th>
                          <th>Chofer</th>
                          <th>Descripcion</th>
                          <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        { incidencias.map((item, index)=> (
                            <tr key={item.id}>
                                <td>{index  + 1}</td>
                                <td>{item.modulo?.nameModulo}</td>
                                <td>{item.modulo?.chofer.nameUser + ' ' + item.modulo?.chofer.lastNameUser} </td>
                                <td>{item.description}</td>
                                {/* <td>{item.updatedAt}</td> */}
                                <td>{dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                            </tr>
                        ))

                        }
                    </tbody>
                </table>
        )
        }

      </div>
    </div>
  )
}

export default FilterIncidencias