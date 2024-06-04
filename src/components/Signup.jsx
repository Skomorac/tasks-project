import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import "../styles/Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://skomorac.dev/mafl-api/api/task/signup",
        {
          email,
          password,
          username,
        }
      );
      console.log("Signup successful", response.data);
      // Redirect to login page or show success message
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <div className="signup-form-container">
      <Container>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSignup}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="email-input-field"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="username-input-field"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Button className="button-submit" variant="warning" type="submit">
            Sign Up
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;
