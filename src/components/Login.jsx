import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

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
      // Show success message and navigate to dashboard
      Swal.fire({
        icon: "success",
        title: t("success"),
        text: t("login_successful"),
        timer: 1500,
        showConfirmButton: false,
        willClose: () => {
          navigate("/dashboard");
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage =
          error.response.data.msg === "Email not found"
            ? t("email_not_found")
            : t("incorrect_password");
        Swal.fire({
          icon: "error",
          title: t("error"),
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t("error"),
          text: t("login_error"),
        });
      }
    }
  };

  return (
    <div className="login-container">
      <Container>
        <h1>{t("login")}</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{t("email_address")}</Form.Label>
            <Form.Control
              className="email-input-field"
              type="email"
              placeholder={t("enter_email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>{t("password")}</Form.Label>
            <Form.Control
              className="password-input-field"
              type="password"
              placeholder={t("enter_password")}
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
