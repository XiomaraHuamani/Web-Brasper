import Link from "next/link";
import { useLocale } from "../../../context/LocaleContext";
import { FaBook } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";

const Footer = () => {
  const { t } = useLocale(); // Accede a las traducciones

  return (
    <footer className="main-footer footer_bacground footer-white rel z-1">
      <div className="footer-cta-wrap">
        <div className="container">
          <div
            className="footer-cta-inner bgs-cover"
            style={{
              backgroundImage: "url(assets/images/footer/footer-cta-bg.jpg)",
            }}
          >
            <div className="section-title wow fadeInLeft delay-0-2s">
              <span className="sub-title">{t.footer.cta.subTitle}</span>
              <h2>{t.footer.cta.title}</h2>
            </div>
            <Link legacyBehavior href="/contact">
              <a className="theme-btn style-three wow fadeInRight delay-0-2s">
                {t.footer.cta.buttonText}{" "}
                <i className="fas fa-long-arrow-right" />
              </a>
            </Link>
            <div className="hotline wow fadeInRight delay-0-2s">
              <i className="fas fa-phone" />
              <div className="content">
                <span>{t.footer.cta.callUs}</span>
                <br />
                <a href={`callto:${t.footer.cta.phone}`}>
                  {t.footer.cta.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row medium-gap">
          <div className="col-xl-3 col-sm-6">
            <div className="footer-widget widget_about wow fadeInUp delay-0-2s">
              <div className="footer-logo mb-30">
                <Link legacyBehavior href="/index">
                  <a>
                    <img
                      src="assets/images/logos/LOGO_POSITIVO.png"
                      alt="Logo"
                    />
                  </a>
                </Link>
              </div>
              <p>{t.footer.about.description}</p>
              <Link legacyBehavior href="/about">
                <a className="read-more">
                  {t.footer.about.moreInfo}{" "}
                  <i className="fas fa-long-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 order-xl-2">
            <div className="footer-widget widget_newsletter wow fadeInUp delay-0-6s">
              <h4 className="footer-title">{t.footer.contactUs.title}</h4>
              <p>{t.footer.contactUs.description}</p>
              <li>
                <i className="far fa-envelope" />{" "}
                <a href={`mailto:${t.footer.contactUs.email}`}>
                  {t.footer.contactUs.email}
                </a>
              </li>
              <h5>{t.footer.contactUs.followUs}</h5>
              <div className="social-style-one">
                <a
                  href="https://www.facebook.com/BrasPerTransferencias"
                  target="_blank"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href="https://www.tiktok.com/@braspertransferencias"
                  target="_blank"
                >
                  <i className="fab fa-tiktok" />
                </a>
                <a
                  href="https://www.instagram.com/brasper.transferencias"
                  target="_blank"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  href="https://www.linkedin.com/in/brasper-transferencias-7a7b7b311/"
                  target="_blank"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
                <a
                  href="https://www.youtube.com/@BrasperTransferencias"
                  target="_blank"
                >
                  <i className="fab fa-youtube" />
                </a>
                <a href="https://x.com/BrasperT21" target="_blank">
                  <i className="fab fa-twitter" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="row">
              <div className="col-md-4 col-6 col-small">
                <div className="footer-widget widget_nav_menu wow fadeInUp dfadeInUp">
                  <h4 className="footer-title">{t.footer.services.title}</h4>
                  <ul className="list-style-two">
                    {t.footer.services.items.map((service, index) => (
                      <li key={index}>
                        <Link legacyBehavior href="about">
                          {service}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-4 col-6 col-small">
                <div className="footer-widget widget_nav_menu wow fadeInUp delay-0-4s">
                  <h4 className="footer-title">{t.footer.aboutUs.title}</h4>
                  <ul className="list-style-two">
                    {t.footer.aboutUs.items.map((item, index) => (
                      <li key={index}>
                        <Link legacyBehavior href="about">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom mt-20 pt-20 border-top">
        <div className="container">
          <div className="row align-items-center">
            {/* Sección de copyright */}
            <div className="col-lg-4">
              <div className="copyright-text text-lg-end wow fadeInLeft delay-0-2s">
                <p>{t.footer.copyright}</p>
              </div>
            </div>

            {/* Sección de libro de reclamaciones */}
            <div className="col-lg-4 text-lg-end mb-3">
              <Link
                href="/claims-book"
                className="claims-book-link d-flex align-items-center justify-content-center"
              >
                <GiOpenBook className="me-2" size={28} />
                Libro de reclamaciones
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-shapes">
        <img
          className="shape one"
          src="assets/images/footer/footer-bg-weve-shape.png"
          alt="Shape"
        />
        <img
          className="shape two"
          src="assets/images/footer/footer-bg-line-shape.png"
          alt="Shape"
        />
        <img
          className="shape three wow fadeInRight delay-0-8s"
          src="assets/images/footer/footer-right.png"
          alt="Shape"
        />
      </div>

      <style jsx>{`
        .claims-book-link {
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
