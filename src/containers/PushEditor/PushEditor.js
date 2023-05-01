import "../../assets/css/editor.css";
import React, { useEffect, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import History from "../../routes/History";
import { connect } from "react-redux";
import * as TemplateActions from "../../store/Template/TemplateActions";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";
import { createStructuredSelector } from "reselect";
import {
  makeSelectTemplateObject,
  makeSelectError,
  makeSelectResponse,
} from "../../store/Template/TemplateReselect";
import { validateIsInputEmpty } from "../../utils/InputValidation";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Modal } from "../../components/Modal/Modal";

const PushEditor = (props) => {
  const {
    initiateSaveTemplate,
    templateObject,
    initiateEditTemplate,
    error,
    response,
    initiateSetErrorToDefault,
    initiateSetResponseToDefault,
  } = props;

  const [loading, showLoader] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [nameError, setNameError] = useState(false);
  const [subjectError, setSubjectError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [valueError, setValueError] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const initiateErrorMessage = () => {
    setNameError("");
    setSubjectError("");
    setDescriptionError("");
    setValueError("");
  };

  const buttons = [
    {
      name: "Save",
      color: "danger",
      testId: "showSaveModal",
      handler: () => {
        setShowSaveModal(true);
      },
    },
    {
      name: "Cancel",
      color: "light",
      testId: "showCancelModal",
      handler: () => {
        setShowCancelModal(true);
      },
    },
  ];

  useEffect(() => {
    if (templateObject !== null) {
      const { name, subject, description, value } = templateObject;
      const { value: obj } = value;
      setName(name);
      setSubject(subject);
      setDescription(description);
      setValue(obj);
    } else {
      setName("");
      setSubject("");
      setDescription("");
      setValue("");
    }
  }, [templateObject]);

  const handleSave = () => {
    initiateErrorMessage();
    const type = "Push";
    const validationResult = validateIsInputEmpty({
      name,
      subject,
      description,
      value,
    });
    if (validationResult.length === 0) {
      if (templateObject !== null) {
        initiateEditTemplate(name, subject, description, value, type);
      } else {
        initiateSaveTemplate(name, subject, description, value, type);
      }
      showLoader(true);
      setTimeout(() => {
        showLoader(false);
        History.push("/home");
      }, 1000);
    } else {
      if (validationResult.includes("name"))
        setNameError("Template Name is required.");
      if (validationResult.includes("subject"))
        setSubjectError("Template Title is required.");
      if (validationResult.includes("description"))
        setDescriptionError("Subtitle is required.");
      if (validationResult.includes("value"))
        setValueError("Message is required.");
    }
    setShowSaveModal(false);
  };

  const handleCancel = () => {
    History.push("/home");
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (response) toast.success(response);
    initiateSetErrorToDefault();
    initiateSetResponseToDefault();
  }, [error, response]);

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      {loading ? <Loader></Loader> : null}
      <Form>
        <br></br>
        <h4 className="text-center mb-5">Push Template Editor</h4>
        <div className="row">
          <Form.Group className="col mb-6" controlId="template_name">
            <Form.Label className="required">Template Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              data-testid="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (validateIsInputEmpty(e.target.value).length === 0)
                  setNameError("");
              }}
              autoComplete="off"
            />
            <ErrorMessage error={nameError} />
          </Form.Group>
          <Form.Group className="col mb-6" controlId="message_sub">
            <Form.Label className="required">Template Title</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              data-testid="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (validateIsInputEmpty(e.target.value).length === 0)
                  setSubjectError("");
              }}
              autoComplete="off"
            />
            <ErrorMessage error={subjectError} />
          </Form.Group>
          <Form.Group className="col mb-6" controlId="template_name">
            <Form.Label className="required">Subtitle</Form.Label>
            <Form.Control
              type="text"
              name="description"
              data-testid="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (validateIsInputEmpty(e.target.value).length === 0)
                  setDescriptionError("");
              }}
              autoComplete="off"
            />
            <ErrorMessage error={descriptionError} />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label className="required">Message</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Sample Notification"
            maxLength="30"
            rows={3}
            data-testid="message"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (validateIsInputEmpty(e.target.value).length === 0)
                setValueError("");
            }}
            autoComplete="off"
          />
          <ErrorMessage error={valueError} />
        </Form.Group>
        <div className="text-right mt-3">
          {buttons.map((button) => {
            return (
              <Button
                data-testid={button.testId}
                key={button.name}
                className="Button"
                variant={button.color}
                onClick={button.handler}
              >
                {button.name}
              </Button>
            );
          })}
        </div>
      </Form>
      {showSaveModal && (
        <Modal
          headerTitle={`Are you sure you want to save Push template`}
          buttons={[
            {
              name: "Confirm",
              color: "danger",
              testId: "triggerHandler",
              handler: handleSave,
            },
            {
              name: "Cancel",
              color: "light",
              testId: "closeModal",
              handler: () => setShowSaveModal(false),
            },
          ]}
        />
      )}
      {showCancelModal && (
        <Modal
          headerTitle={`All changes will be lost. Are you sure to continue?`}
          buttons={[
            {
              name: "Confirm",
              color: "danger",
              handler: handleCancel,
            },
            {
              name: "Cancel",
              color: "light",
              handler: () => setShowCancelModal(false),
            },
          ]}
        />
      )}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  templateObject: makeSelectTemplateObject(),
  error: makeSelectError(),
  response: makeSelectResponse(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    initiateSaveTemplate: (name, subject, description, value, type) =>
      dispatch(
        TemplateActions.saveTemplateRequest({
          name,
          subject,
          description,
          value,
          type,
        })
      ),
    initiateEditTemplate: (name, subject, description, value, type) =>
      dispatch(
        TemplateActions.editTemplateRequest({
          name,
          subject,
          description,
          value,
          type,
        })
      ),
    initiateSetResponseToDefault: () =>
      dispatch(TemplateActions.setResponseToDefault()),
    initiateSetErrorToDefault: () =>
      dispatch(TemplateActions.setErrorToDefault()),
  };
};

PushEditor.propTypes = {
  initiateSaveTemplate: PropTypes.func,
  initiateEditTemplate: PropTypes.func,
  templateObject: PropTypes.object,
  response: PropTypes.string,
  error: PropTypes.string,
  initiateSetResponseToDefault: PropTypes.func,
  initiateSetErrorToDefault: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PushEditor);
