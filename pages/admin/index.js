import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./layout";

const Admin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const role = JSON.parse(localStorage.getItem("role"));
    

    if (!token || role !== "staff") {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      <h1>Panel de Administración</h1>
    </Layout>
  );
};

export default Admin;
