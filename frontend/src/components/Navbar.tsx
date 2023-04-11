import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import icon from "../assets/images/logo.png";

function Navbarx() {
  return (
    <div>
    <Navbar fixed="top" variant="dark" style={{backgroundColor: "#ec1b30"}}  expand="lg">
      <Container>
        <Navbar.Brand href="#">
        <img
              alt=""
              src={icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          myTAs
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{color:"white"}} href="#/login">Home</Nav.Link>
            <Nav.Link style={{color:"white"}}  href="#/register">Register</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </div>
  );
}

export default Navbarx;