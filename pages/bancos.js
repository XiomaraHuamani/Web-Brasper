import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import databancos from "../src/data/databancos"; // Importa los bancos
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useLocale } from "@/context/LocaleContext";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 5,
  spaceBetween: 0,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    575: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1199: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1350: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
};

const Bancos = () => {
  const { t } = useLocale();

  return (
    <section
      id="bancos-section"
      className="partners-area mt-60 pt-50 pb-30 rmt-30 rpb-70 rel z-1"
    >
      <div className="partners-area-three text-center rel z-1 pb-110 rpb-80">
        <div className="container-fluid">
          <div className="section-title text-center mb-50 wow fadeInUp delay-0-2s">
            <span className="sub-title mb-10">Bancos</span>
            <h2>Medios de transferencia</h2>
          </div>

          <Swiper
            {...swiperOptions}
            className="thm-swiper__slider swiper-container"
          >
            {databancos.map((banco, index) => (
              <SwiperSlide key={index}>
                <a
                  href={banco.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }}
                >
                  <img className="w-50" src={banco.img1} alt={banco.nombre} />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Bancos;
