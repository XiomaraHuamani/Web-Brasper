"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Dash = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role"); // Eliminado JSON.parse

    if (!token || role !== "Client") { // Notar la 'C' mayúscula
      router.push("/login");
    } else {
      setLoading(false); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  if (loading) {
    return <div>Cargando...</div>; 
  }

  return (
    <div className="text-center">
      <h1>Bienvenidos a Brasper</h1>
      <p>Esta es la vista del panel de usuario</p>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dash;
