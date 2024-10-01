import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function NavBar(){
    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary px-2" fixed="top">
            <Link to="/" className='navbar-brand'>Logo</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>Home</Nav.Link>
                <Nav.Link>About Me</Nav.Link>
                <Nav.Link>Projects</Nav.Link>
                <Nav.Link>Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
}

export default NavBar;

