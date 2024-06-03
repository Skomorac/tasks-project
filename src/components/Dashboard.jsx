import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import "../styles/Dashboard.css";
import EditPredefinedTaskModal from "./EditPredefinedTaskModal";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskDescription, setEditingTaskDescription] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [predefinedTasks, setPredefinedTasks] = useState([]);
  const [editingPredefinedTaskId, setEditingPredefinedTaskId] = useState(null);
  const [
    editingPredefinedTaskDescription,
    setEditingPredefinedTaskDescription,
  ] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPredefinedTaskId, setCurrentPredefinedTaskId] = useState(null);

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
          setTasks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching tasks", error);
        });

      axios
        .get(`${backendUrl}/task/predefined-tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setPredefinedTasks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching predefined tasks", error);
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
        setTasks([...tasks, response.data]);
        setNewTaskDescription(""); // Clear input field
      })
      .catch((error) => {
        console.error("Error adding task", error);
      });
  };

  const handleAddAndSaveTask = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!newTaskDescription) return;

    axios
      .post(
        `${backendUrl}/task/add-predefined-task`,
        { description: newTaskDescription },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setTasks([...tasks, response.data.task]);
        setPredefinedTasks([...predefinedTasks, response.data.predefined_task]);
        setNewTaskDescription(""); // Clear input field
      })
      .catch((error) => {
        console.error("Error adding and saving task", error);
      });
  };

  const handleDeleteTask = (taskId) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`${backendUrl}/task/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error("Error deleting task", error);
      });
  };

  const handleToggleTask = (taskId, isActive) => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `${backendUrl}/task/tasks/${taskId}`,
        { is_active: !isActive },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, is_active: !isActive } : task
          )
        );
      })
      .catch((error) => {
        console.error("Error toggling task", error);
      });
  };

  const handleEditTask = (taskId) => {
    setEditingTaskId(taskId);
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setEditingTaskDescription(task.description);
    }
  };

  const handleSaveTask = (event, taskId) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .put(
        `${backendUrl}/task/tasks/${taskId}`,
        { description: editingTaskDescription },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setTasks(
          tasks.map((task) =>
            task.id === taskId
              ? { ...task, description: editingTaskDescription }
              : task
          )
        );
        setEditingTaskId(null);
        setEditingTaskDescription("");
      })
      .catch((error) => {
        console.error("Error saving task", error);
      });
  };

  const handleDeletePredefinedTask = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `${backendUrl}/task/predefined-tasks/${currentPredefinedTaskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setPredefinedTasks(
          predefinedTasks.filter((task) => task.id !== currentPredefinedTaskId)
        );
        handleCloseEditModal();
      })
      .catch((error) => {
        console.error("Error deleting predefined task", error);
      });
  };

  const handleEditPredefinedTask = (taskId) => {
    setCurrentPredefinedTaskId(taskId);
    const task = predefinedTasks.find((task) => task.id === taskId);
    if (task) {
      setEditingPredefinedTaskDescription(task.description);
      setShowEditModal(true);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentPredefinedTaskId(null);
    setEditingPredefinedTaskDescription("");
  };

  const handleSavePredefinedTask = () => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${backendUrl}/task/predefined-tasks/${currentPredefinedTaskId}`,
        { description: editingPredefinedTaskDescription },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setPredefinedTasks(
          predefinedTasks.map((task) =>
            task.id === currentPredefinedTaskId
              ? { ...task, description: editingPredefinedTaskDescription }
              : task
          )
        );
        handleCloseEditModal();
      })
      .catch((error) => {
        console.error("Error saving predefined task", error);
      });
  };

  const handleAddPredefinedTask = (description) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `${backendUrl}/task/tasks`,
        { description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        console.error("Error adding predefined task", error);
      });
  };

  const activeTaskCount = tasks.filter((task) => task.is_active).length;

  return (
    <Container className="main-container-dashboard">
      <h1>
        Welcome {username}, {t("number_of_tasks")} {activeTaskCount}
      </h1>
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
            <Button
              variant="secondary"
              onClick={handleAddAndSaveTask}
              style={{ marginLeft: "10px" }}
            >
              {t("add_and_save_task")}
            </Button>
          </Form>
          <Form.Group controlId="formPredefinedTask">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {t("select_predefined_task")}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {predefinedTasks.map((task) => (
                  <Dropdown.Item key={task.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        onClick={() =>
                          handleAddPredefinedTask(task.description)
                        }
                      >
                        {task.description}
                      </span>
                      <FaEdit
                        className="edit-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditPredefinedTask(task.id);
                        }}
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          marginRight: "10px",
                        }}
                      />
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>
        <Col md={8} className="right-box">
          <h2>{t("all_tasks")}</h2>
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                className={`d-flex justify-content-between align-items-center ${
                  !task.is_active ? "completed-task" : ""
                }`}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={!task.is_active}
                    onChange={() => handleToggleTask(task.id, task.is_active)}
                  />
                  {editingTaskId === task.id ? (
                    <Form onSubmit={(e) => handleSaveTask(e, task.id)}>
                      <Form.Control
                        type="text"
                        value={editingTaskDescription}
                        onChange={(e) =>
                          setEditingTaskDescription(e.target.value)
                        }
                      />
                      <Button variant="success" type="submit">
                        Save
                      </Button>
                    </Form>
                  ) : (
                    <span className={task.is_active ? "" : "line-through"}>
                      {task.description}
                    </span>
                  )}
                </div>
                <div>
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEditTask(task.id)}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      marginRight: "10px",
                    }}
                  />
                  <FaTrashAlt
                    className="delete-icon"
                    onClick={() => handleDeleteTask(task.id)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <EditPredefinedTaskModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        taskDescription={editingPredefinedTaskDescription}
        setTaskDescription={setEditingPredefinedTaskDescription}
        handleSave={handleSavePredefinedTask}
        handleDelete={handleDeletePredefinedTask}
      />
    </Container>
  );
};

export default Dashboard;
