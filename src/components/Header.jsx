import React from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/Header.css";

const Header = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar className="container navbar-container" expand="lg">
      <Container>
        {location.pathname === "/dashboard" ? (
          <Navbar.Brand>{i18n.t("RemindME")}</Navbar.Brand>
        ) : (
          <Navbar.Brand as={Link} to="/">
            {i18n.t("RemindME")}
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">
                  {i18n.t("login")}
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  {i18n.t("signup")}
                </Nav.Link>
              </>
            ) : (
              <Button variant="link" onClick={handleLogout}>
                {i18n.t("logout")}
              </Button>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
