import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import '../stylesheets/navstyle.css'

function NavBar(){
    return(
        <>
        <div className="nav position-relative">
          <Navbar expand="lg" className="bg-body-tertiary px-5 d-flex justify-content-between" fixed="top" id='nav'>
              <Link to="/" className='navbar-brand'>Logo</Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse className='flex-grow-0' id="basic-navbar-nav flex-grow-1">
                <Nav className="me-auto">
                  <Nav.Link>Home</Nav.Link>
                  <Nav.Link>About Me</Nav.Link>
                  <Nav.Link>Projects</Nav.Link>
                  <Nav.Link>Contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Navbar>
        </div>
        </>
    )
}

export default NavBar;

