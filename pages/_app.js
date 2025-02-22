// pages/_app.js
import { LocaleProvider } from "../context/LocaleContext";
import { AuthProvider } from "../Providers/auth_provider"; // Asegúrate de que la ruta sea correcta
import "@/styles/globals.css";
import { Fragment, useEffect, useState } from "react";
import JeenaHead from "@/src/layout/JeenaHead";
import Preloader from "@/src/layout/Preloader";
import Chatbox from "@/components/Chatbot/Chatbot";

export default function App({ Component, pageProps }) {
  //const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false); // No cargues innecesariamente

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthProvider>
      <LocaleProvider>
        <Fragment>
          <JeenaHead />
          {/* {loading && <Preloader />} */}
          <Component {...pageProps} />
        </Fragment>
      </LocaleProvider>
    </AuthProvider>
  );
}
