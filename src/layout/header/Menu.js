import Link from "next/link";
import { useState, Fragment } from "react";
import { Accordion } from "react-bootstrap";
import { useLocale } from "../../../context/LocaleContext"; // Asegúrate de importar el contexto de idioma
import Select from "react-select";

const Menu = () => {
  return (
    <Fragment>
      <DeskTopMenu />
      <MobileMenu />
    </Fragment>
  );
};

const languageOptions = [
  { value: "es", label: "Español", flag: "/assets/images/flags/pe.png" },
  { value: "en", label: "English", flag: "/assets/images/flags/usa.png" },
  { value: "pt", label: "Português", flag: "/assets/images/flags/bra.png" },
];
const customSingleValue = ({ data }) => (
  <div className="flex items-center">
    <img src={data.flag} alt={data.label} className="w-2 m-3 h-2 mr-2" />
    {data.label}
  </div>
);
const customOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center p- hover:bg-gray-700 cursor-pointer"
    >
      <img src={data.flag} alt={data.label} className="w-2 h-2 mr-2" />
      {data.label}
    </div>
  );
};
const MobileMenu = () => {
  const { locale, changeLocale, t } = useLocale(); // Usa el contexto de idioma para obtener traducciones
  const [activeMenu, setActiveMenu] = useState(null);

  const active = (value) => setActiveMenu(value === activeMenu ? null : value),
    activeSubMenu = (value) =>
      value == activeMenu ? { display: "block" } : { display: "none" };

  return (
    <nav className="main-menu navbar-expand-lg mobile-menu">
      <Accordion>
        <div className="navbar-header">
          <div className="mobile-logo">
            {/* <Link href="/">
              <img
                src="assets/images/logos/logo_principal.png"
                alt="Logo"
                title="Logo"
              />
            </Link> */}
          </div>
          <div className="pl-4">
            {/* <li className="dropdown">
              <select
                value={locale}
                onChange={(e) => changeLocale(e.target.value)}
                style={{
                  background: "#000000",
                  border: "none",
                  color: "#fff",
                  padding: "5px",
                  borderRadius: "4px",
                }}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </li> */}
          </div>
          <Accordion.Toggle
            as={"button"}
            type="button"
            className="navbar-toggle"
            eventKey="collapse"
            data-bs-target=".navbar-collapse"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse
          eventKey="collapse"
          className="navbar-collapse clearfix"
        >
          <ul className="navigation clearfix">
            <li className="dropdown">
              <Link href="/" onClick={() => active("home")}>
                {t.navbar.home} {/* Traducción de "Inicio" */}
              </Link>
            </li>

            <li className="dropdown">
              <Link href="/about">{t.navbar.about}</Link>
            </li>

            <li className="dropdown">
              <Link href="#">{t.navbar.howItWorks}</Link>
            </li>
            <li className="dropdown">
              <Link href="" onClick={() => active("services")}>
                {t.navbar.services} {/* Traducción de "Servicios" */}
              </Link>
            </li>
            {/* Selector de idioma */}
            <li className="dropdown">
              <select
                value={locale}
                onChange={(e) => changeLocale(e.target.value)}
                style={{
                  background: "#000000",
                  border: "none",
                  color: "#fff",
                  padding: "5px",
                  borderRadius: "4px",
                }}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </li>
            <li className="dropdown">
              <Link href="/login" onClick={() => active("login")}>
                {t.header.login} <i className="fas fa-long-arrow-right" />
              </Link>
            </li>
            <li className="dropdown">
              <Link href="/singup" onClick={() => active("singup")}>
                Registrate <i className="fas fa-long-arrow-right" />
              </Link>
            </li>
          </ul>
        </Accordion.Collapse>
      </Accordion>
    </nav>
  );
};

const DeskTopMenu = () => {
  const { locale, changeLocale, t } = useLocale(); // Usa el contexto de idioma para obtener traducciones

  return (
    <nav className="main-menu navbar-expand-lg desktop-menu ">
      <div className="navbar-header">
        <div className="mobile-logo">
          <Link href="/">
            <img
              src="assets/images/logos/logo_principal.png"
              alt="Logo"
              title="Logo"
            />
          </Link>
        </div>
        <button
          type="button"
          className="navbar-toggle"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse"
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>
      <div className="navbar-collapse collapse clearfix">
        <ul className="navigation clearfix">
          <li className="dropdown">
            <Link href="/">{t.navbar.home}</Link> {/* Traducción de "Inicio" */}
          </li>
          <li className="dropdown">
            <Link href="/about">{t.navbar.about}</Link>{" "}
            {/* Traducción de "¿Quiénes somos?" */}
          </li>
          {/* <li className="dropdown">
            <Link href="#">{t.navbar.howItWorks}</Link>{" "}
          </li>
          <li className="dropdown">
            <Link href="#">{t.navbar.services}</Link>{" "}
          </li>{" "} */}
          <li className="dropdown">
            <Link href="blog">{t.navbar.blog}</Link>{" "}
            {/* Traducción de "Servicios" */}
          </li>
          {/* Selector de idioma */}
          <li className="dropdown p-2">
            <Select
              options={languageOptions}
              value={languageOptions.find((option) => option.value === locale)}
              onChange={(selectedOption) => changeLocale(selectedOption.value)}
              components={{
                SingleValue: customSingleValue,
                Option: customOption,
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  padding: "1px",
                  borderRadius: "1px",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#fff",
                }),
                menu: (base) => ({
                  ...base,
                  background: "#0f1425",
                }),
                option: (base, state) => ({
                  ...base,
                  background: state.isFocused ? "#1f263b" : "#0f1425",
                  color: "#fff",
                }),
              }}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
