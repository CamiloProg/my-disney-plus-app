// PrivateRoute.jsx
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Solo marcamos como no cargando después de 500ms, solo para propósitos visuales
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  // Si aún estamos cargando, mostramos un mensaje de carga
  if (loading) return <div>Loading...</div>;

  return user ? props.element : <Navigate to={"/login"} />;
};

export default PrivateRoute;
