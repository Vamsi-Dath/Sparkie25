import { useState } from "react";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const UserOptions = () => {
    return (
      <Nav.Link className="ms-auto" href="/signin">
        Signin
      </Nav.Link>
    );
  };

  const NavLinks = () => {
    return (
      <>
        <Nav.Link
          style={{
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "white",
            marginRight: "20px",
          }}
          href="/"
        >
          Home
        </Nav.Link>
        <Nav.Link
          style={{
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "white",
            marginRight: "20px",
          }}
          href="/chatbot"
        >
          Chatbot
        </Nav.Link>
        <Nav.Link
          style={{
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "white",
            marginRight: "20px",
          }}
          href="/weather"
        >
          Weather
        </Nav.Link>
        <Nav.Link
          style={{
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "white",
            marginRight: "20px",
          }}
          href="/webrtc"
        >
          WebRTC
        </Nav.Link>
      </>
    );
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="px-3 Navbarclass">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="/static/logo_by_MetaAI.jpg"
              width="50"
              height="50"
              
              className="d-inline-block align-top"
              alt="AgriCulture logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={toggleSidebar}
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="d-none d-lg-flex"
          >
            <Nav className="w-100">
              <NavLinks />
              <UserOptions />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas
        show={showSidebar}
        onHide={toggleSidebar}
        placement="end"
        className="px-3 bg-dark text-white w-auto"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <NavLinks />
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <style>
        {`
        .Navbarclass {
          position: fixed;
          width: 100%;
          z-index: 1000;
        }
      `}
      </style>
    </>
  );
};

export default Header;
