import React from "react";
import { Modal, Form } from "react-bootstrap";
import "./_ModalStyle.css";

export const ModalBody = (props) => {
  const { content } = props;
  return (
    <Modal.Body>
      <Form>{content}</Form>
    </Modal.Body>
  );
};
