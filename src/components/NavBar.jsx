import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons"; // Example icon
import "../stylesheets/navstyle.css"


function NavBar(){
  return(
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">DM</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarText">
            <ul className="navbar-nav">
              <li className="nav-item">
                <HashLink smooth to="/#home" className="nav-link active" aria-current="page" href="#">Home</HashLink>
              </li>
              <li className="nav-item">
                <HashLink smooth to="/#aboutMe" className="nav-link active" aria-current="page" href="#">About Me</HashLink>
              </li>
              <li className="nav-item">
                <HashLink smooth to="/#project" className="nav-link active" aria-current="page" href="#">Projects</HashLink>
              </li>
              <li className="nav-item">
                <HashLink smooth to="/#contact" className="nav-link active" aria-current="page" href="#">contact</HashLink>
              </li>
            </ul>
        </div>
          <span className="dl">
          <button className="icon-button">
          <FontAwesomeIcon icon={faCircleHalfStroke} />
          </button>
          </span>
      </div>
    </nav>
    </>
  )
}
export default NavBar;