import Layout from "@/layout";
import dynamic from "next/dynamic";
import Link from "next/link";
import Slider from "react-slick";
import Bancos from "@/pages/bancos";
import Acerca from "@/pages/acerca";
import TestimonialsSlider from "@/src/components/slider/TestimonialsSlider";
import { useLocale } from "../context/LocaleContext";
import { projectSliderActive } from "@/src/sliderProps";
import Calculator from "@/src/components/calculator/Calculator.jsx";
//import CalculatorContainer from "@/src/components/calculator/CalculatorContainer";

const Counter = dynamic(() => import("@/src/components/Counter"), {
  ssr: false,
});

const Index = () => {
  const { t } = useLocale();

  return (
    <Layout header={1}>
      <section className="hero-area bgc-gray rel z-1">
        <div className="container ">
          <div className="row">
            <div className="col-lg-7 align-self-center ">
              <div className="hero-content pt-115 pb-125 rpb-0 wow fadeInUp delay-0-4s">
                <h1>
                  {t.heroSection.title1}{" "}
                  <span className="hero-content-dos">{t.heroSection.title2}</span>{" "}
                  {t.heroSection.title3}
                </h1>
                {/* <h1>{t.heroSection.title2}</h1>
                <h1>{t.heroSection.title3}</h1> */}
                <h5 style={{color:'white'}}>
                  {t.heroSection.description}
                </h5>
                <Link legacyBehavior href="https://wa.me/?text=Hola,%20estas%20a%20un%20paso%20de%20comenzar%20una%20nueva%20experiencia%20con%20tus%20env%C3%ADos%20online%20a%20Per%C3%BA%20PE%20y%20Brasil%20BR%20.%20Ven%20con%20nosotros%20y%20se%20parte%20de%20la%20comunidad%20de%20Brasper%20Transferencias%20!%20%F0%9F%98%8E%20.%20Confianza%20,%20seguridad%20y%20rapidez%20en%20sus%20env%C3%ADo%20%E2%9D%A4%EF%B8%8F%20%F0%9F%92%9A%20%F0%9F%8E%89%20%F0%9F%91%87%20%F0%9F%92%9A%20.%20Haga%20click%20en%20el%20siguiente%20enlace%20%F0%9F%98%8A%20https://rb.gy/vjpce3%20">
                  <a className="theme-btn mt-20 wow fadeInUp delay-0-6s" target="_blank" rel="noopener noreferrer">
                    {t.heroSection.buttonText}{" "}
                    <i className="fas fa-long-arrow-right" />
                  </a>
                </Link>
                <div className="hero-shapes">
                  <img
                    className="shape one"
                    src="assets/images/shapes/dabble-plus.png"
                    alt="Shape"
                  />
                  <img
                    className="shape two"
                    src="assets/images/shapes/dabble-plus.png"
                    alt="Shape"
                  />
                  <img
                    className="shape three"
                    src="assets/images/shapes/plus.png"
                    alt="Shape"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4  align-middle ">
              <Calculator />
              {/* <CalculatorContainer /> */}
            </div>
          </div>
        </div>
        <div className="hero-shapes">
          <img
            className="shape bg-lines"
            src="assets/images/shapes/hero-bg-line-shapes.png"
            alt="Shape"
          />
          <img
            className="shape right-shape wow fadeInRight delay-0-8s"
            src="assets/images/shapes/hero-right-shape.png"
            alt="Shape"
          />
        </div>
      </section>

      <Bancos />
      <Acerca />

      <section className="project-area overflow-hidden bgc-lighter pt-130 rpt-100 rel z-1">
        <div className="container">
          <div className="section-title text-center mb-55 wow fadeInUp delay-0-2s">
            <span className="sub-title mb-15">Brasper</span>
            <h2>{t.projectSection.title}</h2>
          </div>
          <Slider {...projectSliderActive} className="project-slider-active">
            <div className="project-slider-item">
              <div className="video">
                <img src="assets/images/projects/img_video2.png" alt="Video" />
                <a
                  href="https://www.youtube.com/watch?v=DPR8pZN9OrM"
                  className="mfp-iframe video-play"
                  tabIndex={-1}
                  target="_blank"
                >
                  <i className="fas fa-play" />
                </a>
              </div>
              <div className="content">
                <h4>{t.projectSection.item1Title}</h4>
                <p>{t.projectSection.item1Description}</p>
                <ul className="list-style-one">
                  <li>{t.projectSection.item1Point1}</li>
                  <li>{t.projectSection.item1Point2}</li>
                </ul>
                <Link legacyBehavior href="/project-details">
                  <a className="theme-btn style-two mt-15">
                    {t.projectSection.viewDetails}{" "}
                    <i className="fas fa-long-arrow-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="project-slider-item">
              <div className="content">
                <h4>{t.projectSection.item2Title}</h4>
                <p>{t.projectSection.item2Description}</p>
                <ul className="list-style-one">
                  <li>{t.projectSection.item2Point1}</li>
                  <li>{t.projectSection.item2Point2}</li>
                </ul>
                <Link legacyBehavior href="/project-details">
                  <a className="theme-btn style-two mt-15">
                    {t.projectSection.viewMore}{" "}
                    <i className="fas fa-long-arrow-right" />
                  </a>
                </Link>
              </div>
              <div className="video">
                <img src="assets/images/projects/img-video1.png" alt="Video" />
                <a
                  href="https://youtube.com/shorts/arT3LE9GSvk?si=wyoG0vCLHUd4UDnV"
                  className="mfp-iframe video-play"
                  tabIndex={-1}
                  target="_blank"
                >
                  <i className="fas fa-play" />
                </a>
              </div>
            </div>
          </Slider>
        </div>
        <div className="project-shapes">
          <img
            className="shape one"
            src="assets/images/shapes/project-left.png"
            alt="shape"
          />
          <img
            className="shape two"
            src="assets/images/shapes/project-right.png"
            alt="shape"
          />
        </div>
      </section>

      <section
        className="services-area text-white pt-75 pb-10 rel z-1"
        style={{ backgroundColor: "#1b1f2e" }}
      >
        <div className="container">
          <div className="row medium-gap">
            <div className="col-xl-4 col-md-6">
              <div className="section-title mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-15">
                </span>
                <h2>{t.servicesSection.subtitle}</h2>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="service-two-item wow fadeInUp delay-0-4s">
                <div className="icon">
                  <img
                    src="assets/images/acerca/transferencias.png"
                    alt="transferencias"
                  />
                </div>
                <div className="content">
                  <h4>
                    <Link legacyBehavior href="service-details">
                      {t.servicesSection.service1Title}
                    </Link>
                  </h4>
                  <p>{t.servicesSection.service1Description}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="service-two-item wow fadeInUp delay-0-6s">
                <div className="icon">
                  <img
                    src="assets/images/acerca/cotizaciones.png"
                    alt="transferencias"
                  />
                </div>
                <div className="content">
                  <h4>
                    <Link legacyBehavior href="service-details">
                      {t.servicesSection.service2Title}
                    </Link>
                  </h4>
                  <p>{t.servicesSection.service2Description}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="service-two-item wow fadeInUp delay-0-3s">
                <div className="icon">
                  <img
                    src="assets/images/acerca/envios.png"
                    alt="transferencias"
                  />
                </div>
                <div className="content">
                  <h4>
                    <Link legacyBehavior href="service-details">
                      {t.servicesSection.service3Title}
                    </Link>
                  </h4>
                  <p>{t.servicesSection.service3Description}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="service-two-item wow fadeInUp delay-0-5s">
                <div className="icon">
                  <img
                    src="assets/images/acerca/servicios.png"
                    alt="transferencias"
                  />
                </div>
                <div className="content">
                  <h4>
                    <Link legacyBehavior href="service-details">
                      {t.servicesSection.service4Title}
                    </Link>
                  </h4>
                  <p>{t.servicesSection.service4Description}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="service-two-item wow fadeInUp delay-0-7s">
                <div className="icon">
                  <img
                    src="assets/images/acerca/economia.png"
                    alt="transferencias"
                  />
                </div>
                <div className="content">
                  <h4>
                    <Link legacyBehavior href="service-details">
                      {t.servicesSection.service5Title}
                    </Link>
                  </h4>
                  <p>{t.servicesSection.service5Description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="work-process-area pt-130 pb-100 rpt-100 rpb-70 rel z-1">
        <div className="section-title text-center mb-70 wow fadeInUp delay-0-2s">
          <span className="sub-title mb-15">
            {t.workProcessSection.subtitle}
          </span>
          <h2>{t.workProcessSection.title}</h2>
        </div>
        <div className="work-process-line text-center">
          <img src="assets/images/shapes/work-process-line.png" alt="line" />
        </div>
        <div className="container">
          <div className="row row-cols-xl-5 row-cols-md-3 row-cols-sm-2 row-cols-1 justify-content-center">
            <div className="col">
              <div className="work-process-item mt-40 wow fadeInUp delay-0-2s">
                <div className="number">01</div>
                <div className="content">
                  <h4>{t.workProcessSection.step1Title}</h4>
                  <p>{t.workProcessSection.step1Description}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="work-process-item mt-10 wow fadeInDown delay-0-2s">
                <div className="number">02</div>
                <div className="content">
                  <h4>{t.workProcessSection.step2Title}</h4>
                  <p>{t.workProcessSection.step2Description}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="work-process-item mt-40 wow fadeInUp delay-0-2s">
                <div className="number">03</div>
                <div className="content">
                  <h4>{t.workProcessSection.step3Title}</h4>
                  <p>{t.workProcessSection.step3Description}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="work-process-item wow fadeInDown delay-0-2s">
                <div className="number">04</div>
                <div className="content">
                  <h4>{t.workProcessSection.step4Title}</h4>
                  <p>{t.workProcessSection.step4Description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-area-two pb-115 rpb-85 rel z-1">
        <div className="container">
          <TestimonialsSlider />
        </div>
      </section>

    </Layout>
  );
};
export default Index;
