import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar bg="secondary" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {i18n.t("RemindME")}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              {i18n.t("home")}
            </Nav.Link>
            <Nav.Link as={Link} to="/tasks">
              {i18n.t("tasks")}
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              {i18n.t("login")}
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              {i18n.t("signup")}
            </Nav.Link>
            <NavDropdown title={i18n.t("language")} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => changeLanguage("en")}>
                EN
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage("bs")}>
                BS
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
