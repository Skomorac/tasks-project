import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Login.css"; // Reuse the same CSS as Login
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/task/forgot-password`,
        {
          email,
        }
      );

      setEmail("");
      Swal.fire({
        icon: "success",
        title: t("success"),
        text: response.data.msg,
        showConfirmButton: true,
        willClose: () => {
          navigate("/");
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: error.response.data.msg || t("forgot_password_error"),
      });
    }
  };

  return (
    <div className="login-container">
      <Container>
        <h1>{t("forgot_password")}</h1>
        <Form onSubmit={handleForgotPassword}>
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

          <Button className="button-submit" variant="warning" type="submit">
            {t("send_reset_link")}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ForgotPassword;
