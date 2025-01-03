import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    country_code: "51", // Código predeterminado para Perú
    phone_number: "",
    email: "",
    password: "",
    password2: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);  // Agregar este estado

  const [errors, setErrors] = useState({});

  const handleOnchange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,15}$/;

    if (!emailRegex.test(formdata.email)) {
      formErrors.email = "El correo no es válido.";
    }
    if (!phoneRegex.test(formdata.phone_number)) {
      formErrors.phone_number = "El teléfono debe tener entre 9 y 15 dígitos.";
    }
    if (formdata.password.length < 6) {
      formErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (formdata.password !== formdata.password2) {
      formErrors.password2 = "Las contraseñas no coinciden.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/register/`,
          formdata,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast.success(
            "Registro exitoso, redirigiendo a la página de inicio de sesión..."
          );
          router.push("/login");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const serverErrors = error.response.data;
          for (const key in serverErrors) {
            toast.error(`${key}: ${serverErrors[key].join(", ")}`);
          }
        } else {
          toast.error("Error en el registro, por favor revisa los datos.");
        }
      }
    } else {
      toast.error("Por favor corrige los errores en el formulario.");
    }
  };

  useEffect(() => {
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
      setIsLoading(true);
      console.log("Google response:", response);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/google/`,
        { credential: response.credential }
      );

      if (res.status === 200) {
        const { data } = res;
        console.log("Server response:", data);

        // Guardar los datos en localStorage
        localStorage.setItem("token", data.key || data.token);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        if (data.role) {
          localStorage.setItem("role", data.role);
        }

        toast.success("Registro exitoso");
        router.push("/Dash");
      }
    } catch (error) {
      console.error("Error completo:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      toast.error("Error en el registro con Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <h2 className="card-title pb-15">¡Regístrate como persona!</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de código de país y teléfono */}
          <div className="input-group">
            <select
              className="form-control"
              name="country_code"
              value={formdata.country_code}
              onChange={handleOnchange}
            >
              <option value="51">+51 (PER)</option>
              <option value="1">+1 (USA)</option>
              <option value="55">+55 (BR)</option>
            </select>
            <input
              className="form-control"
              type="text"
              name="phone_number"
              placeholder="Número celular"
              value={formdata.phone_number}
              onChange={handleOnchange}
            />
          </div>
          {errors.phone_number && (
            <p className="error-text">{errors.phone_number}</p>
          )}

          {/* Campo de correo */}
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formdata.email}
            onChange={handleOnchange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          {/* Campo de contraseña */}
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formdata.password}
            onChange={handleOnchange}
          />
          {errors.password && (
            <p className="error-text">{errors.password}</p>
          )}

          {/* Confirmar contraseña */}
          <input
            className="form-control"
            type="password"
            name="password2"
            placeholder="Confirmar contraseña"
            value={formdata.password2}
            onChange={handleOnchange}
          />
          {errors.password2 && (
            <p className="error-text">{errors.password2}</p>
          )}

          {/* Botón de registro */}
          <button id="submit" type="submit" className="btn">
            Continuar
          </button>
        </form>

        {/* Botón de Google Sign-In */}
        <div id="googleSignInButton" className="google-button"></div>
        <p className="login-link">
          ¿Ya tienes cuenta? <Link href="/login">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
