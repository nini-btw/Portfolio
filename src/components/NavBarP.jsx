import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import "../stylesheets/navS.sass";
import logo from "../../public/images/logo.png";

const SECTION_IDS = ["home", "aboutMe", "project", "contact"];

function useActiveSection() {
  const [activeId, setActiveId] = useState(SECTION_IDS[0]);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

function NavBarP() {
  const activeId = useActiveSection();

  const navLinks = [
    { id: "home", to: "/#home", label: "Home" },
    { id: "aboutMe", to: "/#aboutMe", label: "About Me" },
    { id: "project", to: "/#project", label: "Projects" },
    { id: "contact", to: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top overflow-hidden">
        <a className="navbar-brand mb-4" href="#" id="navbar-logo">
          <img id="logo" src={logo} alt="Logo" width="100" height="100" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarText"
        >
          <ul className="navbar-nav">
            {navLinks.map(({ id, to, label }) => (
              <li className="nav-item" key={id}>
                <HashLink
                  smooth
                  to={to}
                  className="nav-link active"
                  aria-current={activeId === id ? "page" : undefined}
                >
                  {label}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
export default NavBarP;
