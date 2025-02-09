import { useState } from "react";
import { Navbar, Container, Offcanvas, Nav, Dropdown } from "react-bootstrap";
import { useSession } from "../sessionProvider/SessionProvider";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { session, updateSession } = useSession();

  const UserOptions = () => {
    if (session)
      if (session.isSignedIn) {
        return (
          <Dropdown align="end" className="ms-auto">
            <Dropdown.Toggle
              id="user-dropdown"
              style={{
                backgroundColor: "darkgreen",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={session.picture} // Image URL from session.picture
                alt="User"
                style={{
                  width: "30px", // Size of the image
                  height: "30px", // Make it a small square
                  borderRadius: "50%", // Make it circular
                  marginRight: "8px", // Space between image and text
                }}
              />
              {session.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/signin">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      } else {
        return (
          <Nav.Link className="ms-auto" href="/signin">
            Signin
          </Nav.Link>
        );
      }
    return <></>;
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
          Video Chat
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
        className="px-3 Navbarclass"
      >
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
