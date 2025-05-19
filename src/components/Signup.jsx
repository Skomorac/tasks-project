import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import "../styles/Signup.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });
  const [emailValid, setEmailValid] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("passwords_do_not_match"),
      });
      return;
    }
    if (!emailValid) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("invalid_email_format"),
      });
      return;
    }
    try {
      const response = await axios.post(
        "https://skomorac.dev/mafl-api/api/task/signup",
        {
          email,
          password,
          username,
        }
      );
      Swal.fire({
        icon: "success",
        title: t("success"),
        text: t("signup_successful"),
      }).then(() => {
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setUsername("");
        navigate("/login");
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.msg === "User already exists"
      ) {
        Swal.fire({
          icon: "error",
          title: t("error"),
          text: t("user_exists"),
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t("error"),
          text: t("signup_error"),
        });
      }
    }
  };

  const validatePassword = (password) => {
    setPasswordValid({
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 8,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  };

  return (
    <div className="signup-form-container">
      <Container>
        <h1>{t("signup")}</h1>
        <Form onSubmit={handleSignup}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{t("email_address")}</Form.Label>
            <Form.Control
              className={`email-input-field ${emailValid ? "" : "invalid"}`}
              type="email"
              placeholder={t("enter_email")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              required
              autoFocus
            />
            {!emailValid && (
              <Form.Text className="text-warning">
                {t("invalid_email_warning")}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>{t("username")}</Form.Label>
            <Form.Control
              className="username-input-field"
              type="text"
              placeholder={t("enter_username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>{t("password")}</Form.Label>
            <Form.Control
              className="password-input-field"
              type="password"
              placeholder={t("enter_password")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              required
            />
            <ul className="password-requirements">
              <li className={passwordValid.hasUpperCase ? "valid" : "invalid"}>
                {t("uppercase_letter")}
              </li>
              <li className={passwordValid.hasLowerCase ? "valid" : "invalid"}>
                {t("lowercase_letter")}
              </li>
              <li className={passwordValid.hasNumber ? "valid" : "invalid"}>
                {t("number")}
              </li>
              <li
                className={passwordValid.hasSpecialChar ? "valid" : "invalid"}
              >
                {t("special_character")}
              </li>
              <li className={passwordValid.hasMinLength ? "valid" : "invalid"}>
                {t("min_length")}
              </li>
            </ul>
          </Form.Group>

          <Form.Group controlId="formBasicRepeatPassword">
            <Form.Label>{t("repeat_password")}</Form.Label>
            <Form.Control
              className="repeat-password-input-field"
              type="password"
              placeholder={t("repeat_password")}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            className="button-submit"
            variant="warning"
            type="submit"
            disabled={
              !passwordValid.hasUpperCase ||
              !passwordValid.hasLowerCase ||
              !passwordValid.hasNumber ||
              !passwordValid.hasSpecialChar ||
              !passwordValid.hasMinLength ||
              !emailValid
            }
          >
            {t("signup")}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;
