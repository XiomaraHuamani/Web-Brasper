import React from "react";
import Image from 'next/image';
import popup2 from "../../public/assets/images/popup/cancion_criolla.jpeg";

const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button onClick={onClose} className="close-btn">
          &times;
        </button>
        <Image
          src={popup2}
          alt="Popup"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          max-width: 90%;
          width: 500px;
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 10px; /* Ajuste para que la X esté dentro del borde del popup */
          right: 10px; /* Ajuste para que la X esté dentro del borde del popup */
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #000000; /* Color blanco */
        }
      `}</style>
    </div>
  );
};

export default Popup;
