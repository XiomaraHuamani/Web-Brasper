import Link from "next/link";
import Menu from "./Menu";
import { useLocale } from "../../../context/LocaleContext"; // Importa el contexto de idioma

const Header1 = () => {
  const { locale, changeLocale, t } = useLocale(); // Usa el contexto de idioma

  return (
    <header className="main-header header-one menu-white">
      <div className="header-upper bgc-black">
        <div className="container clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <img
              src="assets/images/logos/logo_blanco.png"
              alt="Logo"
              title="Logo"
              className="logo"
            />
            <div className="nav-outer mx-auto clearfix">
              <Menu />
            </div>
            <div className="menu-btns">
              <Link legacyBehavior href="login">
                <a className="theme-btn">
                  {t.header.login} <i className="fas fa-long-arrow-right" />
                </a>
              </Link>
            </div>
           {/*  <div className="menu-btns">
              <Link legacyBehavior href="/singup">
                <a className="theme-btn style-three">
                  Registrate <i className="fas fa-long-arrow-right" />
                </a>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header1;
