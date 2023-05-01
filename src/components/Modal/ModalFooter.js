import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./_ModalStyle.css";
export const ModalFooter = (props) => {
  const { buttons } = props;

  return (
    <Modal.Footer>
      {buttons.map((button) => {
        return (
          <Button
            data-testid={button.testId}
            key={button.name}
            onClick={button.handler}
            variant={button.color}
            className="Button"
          >
            {button.name}
          </Button>
        );
      })}
    </Modal.Footer>
  );
};
