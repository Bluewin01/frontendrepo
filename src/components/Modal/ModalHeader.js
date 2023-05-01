import React from "react";
import { Modal } from "react-bootstrap";
import "./_ModalStyle.css";

export const ModalHeader = (props) => {
  const { headerTitle } = props;

  return (
    <Modal.Header className="modalHeader">
      <div className="mx-auto">{headerTitle}</div>
    </Modal.Header>
  );
};
