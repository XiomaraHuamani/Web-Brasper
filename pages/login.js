import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/google`,
        { token: response.credential }
      );

      if (res.status === 200) {
        const data = res.data;
        sessionStorage.setItem("token", data.token);
        login({
          token: data.token,
          id: data.id,
          nombre: data.nombre,
          rol: data.rol,
        });

        if (data.rol === "Admin") {
          navigate("/admin");
        } else if (data.rol === "Super Admin") {
          navigate("/superadmin");
        } else if (data.rol === "Alumno") {
          navigate("/Alumno");
        }
      }
    } catch (error) {
      console.error("Error al autenticar con Google:", error);
    }
  };

  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e) => {
    setLogindata({ ...logindata, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password } = logindata;
    if (!email.trim() || !password.trim()) {
      toast.error("Todos los campos son obligatorios");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/login/`,
        logindata,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      

      const { data } = response; 

      
      const { role, tokens, user } = data;

      if (!role) {
        toast.error("Rol no encontrado en la respuesta del servidor");
        return;
      }

      // Guardar tokens y detalles del usuario en localStorage
      localStorage.setItem("token", tokens.access);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", JSON.stringify(role));
      console.log(role);

      toast.success("Inicio de sesión exitoso");

      // Redireccionar basado en el rol del usuario y pasar datos por query
      if (role === "staff") {
        router.push({
          pathname: "/admin",
          query: { role: "staff" },
        });
      } else if (role === "client") {
        router.push({
          pathname: "/Dash",
          query: { role: "client" },
        });
      } else {
        toast.error("Rol no reconocido, acceso denegado");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 && error.response.data.error) {
          // Manejo específico del error "La cuenta no está verificada"
          if (error.response.data.error.includes("La cuenta no está verificada")) {
            toast.error("La cuenta no está verificada. Por favor, verifica tu correo electrónico.");
          } else {
            toast.error("Usuario o contraseña incorrectos");
          }
        } else {
          toast.error("Error al iniciar sesión, por favor intenta nuevamente");
        }
      } else {
        toast.error("Error al iniciar sesión, por favor intenta nuevamente");
      }
      console.error("Error al intentar iniciar sesión:", error);
    }
  };

  return (
    <>
      <div className="form-body without-side">
        <div className="website-logo">
          <a href="/">
            <div className="logo">
              <img
                className="logo-size"
                src="/assets/images/logos/logo-light.svg"
                alt="Logo"
              />
            </div>
          </a>
        </div>
        <div className="iofrm-layout">
          <div className="img-holder">
            <div className="bg"></div>
            <div className="info-holder">
              <img src="/assets/images/logos/graphic3.svg" alt="Graphic" />
            </div>
          </div>
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3 className="text-center pb-3">Inicio de sesión</h3>
                <p>Accede a todos nuestros beneficios en Brasper</p>
                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Correo"
                    value={logindata.email}
                    onChange={handleOnchange}
                    required
                  />
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={logindata.password}
                    onChange={handleOnchange}
                    required
                  />
                  <div className="form-button">
                    <button type="submit" className="btn btn-primary">
                      Ingresar
                    </button>
                  </div>
                  <a href="/forget">¿Olvidaste tu contraseña?</a>
                </form>
                
                <div className="page-links">
                <div id="googleSignInButton" className="mt-4"></div>
                  <Link href="/singup">Registrarse</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
