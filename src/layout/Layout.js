import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router"; // Importar useRouter para controlar la ruta actual
import ImageView from "../components/ImageView";
import VideoPopup from "../components/VideoPopup";
import Footer from "./footer/Index";
import Header from "./header/Index";
import ScrollTopButton from "./ScrollTopButton";
import ChatBot from "../components/Chatbot/Chatbot";
import Popup from "@/components/Popup";

const Layout = ({ children, header }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter(); // Hook para obtener la ruta actual

  useEffect(() => {
    if (router.pathname === "/") {
      setIsPopupOpen(true);
    }
  }, [router.pathname]); 

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Fragment>
      <VideoPopup />
      <ImageView />
      <div className="page-wrapper">
        <Header header={header} />
        {children}
        <Footer />
      </div>
      {/* Renderizar el Popup solo si está abierto */}
    {/*   <Popup isOpen={isPopupOpen} onClose={closePopup} /> */}
      <ChatBot />
    </Fragment>
  );
};

export default Layout;
