import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://skomorac.dev/mafl-api/api/task/login",
        {
          email,
          password,
        }
      );
      // Save the token to local storage
      localStorage.setItem("token", response.data.token);
      // Clear email and password state
      setEmail("");
      setPassword("");
      // Redirect to tasks page or dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="login-container">
      <Container>
        <h1>{t("login")}</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="email-input-field"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="password-input-field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button className="button-submit" variant="warning" type="submit">
            {t("login")}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
