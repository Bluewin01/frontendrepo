import React from "react";
import { Modal as ReactModal, Button } from "react-bootstrap";
import "./_ModalStyle.css";
import { ModalHeader } from "./ModalHeader";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";

export const Modal = (props) => {
  const { headerTitle, buttons, children } = props;

  return (
    <>
      <ReactModal
        show={true}
        backdrop="static"
        keyboard={false}
        animation={false}
        dialogClassName={children ? "fullScreenModal" : null}
        centered
      >
        <ModalHeader headerTitle={headerTitle} />
        {children && <ModalBody content={children} />}
        <ModalFooter buttons={buttons} />
      </ReactModal>
    </>
  );
};
