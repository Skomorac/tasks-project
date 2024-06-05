import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/Header.css";

const Header = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [expanded, setExpanded] = useState(false); // State to manage navbar collapse

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setExpanded(false); // Collapse the navbar after logout
  };

  const handleToggle = () => {
    setExpanded(!expanded); // Toggle the navbar state
  };

  return (
    <Navbar
      className="container navbar-container"
      expand="lg"
      expanded={expanded} // Bind state to expanded prop
      onToggle={handleToggle}
    >
      <Container>
        {location.pathname === "/dashboard" ? (
          <Navbar.Brand>{i18n.t("RemindME")}</Navbar.Brand>
        ) : (
          <Navbar.Brand as={Link} to="/">
            {i18n.t("RemindME")}
          </Navbar.Brand>
        )}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleToggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Conditionally render Login/Signup buttons */}
            {!token && (
              <>
                {location.pathname !== "/login" && (
                  <Nav.Link
                    as={Link}
                    to="/login"
                    onClick={() => setExpanded(false)}
                  >
                    {i18n.t("login")}
                  </Nav.Link>
                )}
                {location.pathname !== "/signup" && (
                  <Nav.Link
                    as={Link}
                    to="/signup"
                    onClick={() => setExpanded(false)}
                  >
                    {i18n.t("signup")}
                  </Nav.Link>
                )}
              </>
            )}
            <NavDropdown
              title={i18n.t("language")}
              id="basic-nav-dropdown"
              className="ms-auto"
            >
              <NavDropdown.Item onClick={() => changeLanguage("en")}>
                EN
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage("bs")}>
                BS
              </NavDropdown.Item>
            </NavDropdown>
            {token && (
              <Button variant="link" onClick={handleLogout}>
                {i18n.t("logout")}
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
