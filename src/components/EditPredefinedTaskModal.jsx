import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const EditPredefinedTaskModal = ({
  show,
  handleClose,
  taskDescription,
  setTaskDescription,
  handleSave,
  handleDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("edit_predefined_task")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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

export default EditPredefinedTaskModal;
