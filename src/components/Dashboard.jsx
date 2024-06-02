import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      axios
        .get(`${backendUrl}/task/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
          navigate("/");
        });

      axios
        .get(`${backendUrl}/task/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTasks(response.data.map((task) => task.description)); // Map to descriptions
        })
        .catch((error) => {
          console.error("Error fetching tasks", error);
        });
    }
  }, [navigate, backendUrl]);

  const handleAddTask = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!newTaskDescription) return;

    axios
      .post(
        `${backendUrl}/task/tasks`,
        { description: newTaskDescription },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setTasks([...tasks, response.data.description]);
        setNewTaskDescription(""); // Clear input field
      })
      .catch((error) => {
        console.error("Error adding task", error);
      });
  };

  return (
    <Container className="main-container-dashboard">
      <h1>Welcome {username}</h1>
      <Row>
        <Col md={4} className="left-box">
          <Form onSubmit={handleAddTask}>
            <Form.Group controlId="formNewTask">
              <Form.Control
                type="text"
                placeholder={t("task_description")}
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {t("add_task")}
            </Button>
          </Form>
        </Col>
        <Col md={8} className="right-box">
          <h2>{t("all_tasks")}</h2>
          <ListGroup>
            {tasks.map((description, index) => (
              <ListGroup.Item key={index}>
                <div>{description}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
