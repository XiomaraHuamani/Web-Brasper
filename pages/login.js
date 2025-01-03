import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { px } from "framer-motion";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  const handleGoogleResponse = async (response) => {
    try {
      setIsLoading(true);
      console.log("Google response:", response); // Para debug
  
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/google/`,
        { credential: response.credential } // Cambiado de access_token a credential
      );
  
      if (res.status === 200) {
        const { data } = res;
        console.log("Server response:", data); // Para debug
  
        // Guardar datos usando las claves correctas que vienen del backend
        localStorage.setItem("token", data.key); // Cambiado de data.access_token a data.key
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        if (data.role) {
          localStorage.setItem("role", data.role);
        }
  
        toast.success("Inicio de sesión exitoso");
  
        // Manejar la redirección basada en el rol
        const userRole = typeof data.role === 'string' ? data.role : String(data.role);
        console.log("User role:", userRole); // Para debug
  
        switch(userRole) { // Hacer la comparación case-insensitive
          case 'Staff':
            router.push("/admin");
            break;
          case 'client':
            router.push("/Dash");
            break;
          default:
            toast.error("Rol no reconocido, acceso denegado");
        }
      }
    } catch (error) {
      console.error("Error completo:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      toast.error("Error al iniciar sesión con Google");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadGoogleScript = () => {
        if (window.google?.accounts?.id) {
          try {
            window.google.accounts.id.initialize({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
              callback: handleGoogleResponse,
              auto_select: false,
              cancel_on_tap_outside: true,
              prompt_parent_id: 'googleSignInButton',
              use_fedcm_for_prompt: true // Agregar esta opción
            });
  
            window.google.accounts.id.renderButton(
              document.getElementById('googleSignInButton'),
              {
                type: 'standard',
                theme: 'outline',
                size: 'large',
                text: 'signin_with',
                shape: 'rectangular',
                width: 240,
                locale: 'es'
              }
            );
          } catch (error) {
            console.error('Error initializing Google Sign-In:', error);
          }
        }
      };
  
      // Cargar el script de Google
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleScript;
      document.head.appendChild(script);
  
      return () => {
        // Cleanup
        const scriptElement = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (scriptElement) {
          scriptElement.remove();
        }
      };
    }
  }, [handleGoogleResponse]);

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
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/google/`,
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

      localStorage.setItem("token", tokens.access);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", JSON.stringify(role));

      toast.success("Inicio de sesión exitoso");

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
      if (error.response?.status === 401 && error.response.data?.error) {
        if (error.response.data.error.includes("La cuenta no está verificada")) {
          toast.error("La cuenta no está verificada. Por favor, verifica tu correo electrónico.");
        } else {
          toast.error("Usuario o contraseña incorrectos");
        }
      } else {
        toast.error("Error al iniciar sesión, por favor intenta nuevamente");
      }
      console.error("Error al intentar iniciar sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-body without-side">
      <div className="website-logo">
        <Link href="/">
          <div className="logo">
            <img
              className="logo-size"
              src="/assets/images/logos/logo-light.svg"
              alt="Logo"
            />
          </div>
        </Link>
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
                  disabled={isLoading}
                  required
                />
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={logindata.password}
                  onChange={handleOnchange}
                  disabled={isLoading}
                  required
                />
                <div className="form-button">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Cargando..." : "Ingresar"}
                  </button>
                </div>
                <Link href="/forget">¿Olvidaste tu contraseña?</Link>
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
  );
};

export default Login;