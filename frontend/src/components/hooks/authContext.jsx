// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [choferes, setChoferes] = useState([]);
  const [modulos, setModulos] =useState([]);

      const listaChoferes = async() =>{
      const response = await axios.get("http://localhost:3000/api/login/users-choferes");
      setChoferes(response.data);
    }

    const listaModulos = async() => {
      const response = await axios.get("http://localhost:3000/api/modulos");
      setModulos(response.data)
    }
    

  useEffect(() => {
    const userId = localStorage.getItem("id_usuario");
    const role = localStorage.getItem("rol_id");

    if (userId && role) {
      setUser({ id: userId, role: role });
    }
    listaChoferes();
    listaModulos()
    setLoading(false);
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser, loading, choferes, modulos, listaModulos }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}