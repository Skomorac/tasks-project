import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import "../styles/Login.css"; // Reuse the same CSS as Login
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [isValidToken, setIsValidToken] = useState(null); // null indicates loading state
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const validateToken = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/task/check-token/${token}`
        );

        setIsValidToken(true);
      } catch (error) {
        setIsValidToken(false);
        Swal.fire({
          icon: "error",
          title: t("error"),
          text: t("invalid_or_expired_token"),
        });
      }
    };

    validateToken();
  }, [token, t]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/task/reset-password/${token}`,
        {
          new_password: newPassword,
        }
      );

      setNewPassword("");
      Swal.fire({
        icon: "success",
        title: t("success"),
        text: t("reset_password_success"),
        showConfirmButton: true,
        willClose: () => {
          navigate("/login");
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: error.response.data.msg || t("reset_password_error"),
      });
    }
  };

  if (isValidToken === null) {
    return (
      <div className="login-container">
        <Container>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </div>
    );
  }

  if (!isValidToken) {
    return null; // Return nothing if the token is invalid, as the Swal alert will handle the error message
  }

  return (
    <div className="login-container">
      <Container>
        <h1>{t("reset_password")}</h1>
        <Form onSubmit={handleResetPassword}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>{t("new_password")}</Form.Label>
            <Form.Control
              className="password-input-field"
              type="password"
              placeholder={t("enter_new_password")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>

          <Button className="button-submit" variant="warning" type="submit">
            {t("reset_password")}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ResetPassword;
