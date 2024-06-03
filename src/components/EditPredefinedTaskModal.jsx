import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const EditPredefinedTaskModal = ({
  show,
  handleClose,
  taskDescription,
  setTaskDescription,
  handleSave,
  handleDelete,
}) => {
  const { t } = useTranslation();

  // Prevent default form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("edit_predefined_task")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formTaskDescription">
            <Form.Label>{t("task_description")}</Form.Label>
            <Form.Control
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("close")}
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          {t("delete_task")}
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {t("save_changes")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditPredefinedTaskModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  taskDescription: PropTypes.string.isRequired,
  setTaskDescription: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default EditPredefinedTaskModal;
