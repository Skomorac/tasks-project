import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import "../styles/EditTaskModal.css";

const EditTaskModal = ({
  show,
  handleClose,
  taskDescription,
  setTaskDescription,
  handleSave,
  handleDelete,
  isPredefined,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t(isPredefined ? "edit_predefined_task" : "edit_task")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
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
      <Modal.Footer className="modal-footer-buttons-container">
        <Button variant="danger" onClick={handleDelete}>
          {t("delete_task")}
        </Button>
        <Button variant="success" onClick={handleSave}>
          {t("save_changes")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditTaskModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  taskDescription: PropTypes.string.isRequired,
  setTaskDescription: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isPredefined: PropTypes.bool.isRequired,
};

export default EditTaskModal;
