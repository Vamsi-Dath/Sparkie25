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
      <Navbar
        style={{ backgroundColor: "green" }}
        variant="dark"
        expand="lg"
        className="px-3"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="/favicon.ico"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
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
            <Nav.Link
              style={{
                fontFamily: "Arial",
                fontWeight: "bold",
                color: "white",
                marginRight: "20px",
              }}
              href="/signin"
            >
              Signin
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
