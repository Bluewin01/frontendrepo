import "../../assets/css/editor.css";
import React, { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as TemplateActions from "../../store/Template/TemplateActions";
import PropTypes from "prop-types";
import { Modal } from "../../components/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";
import History from "../../routes/History";
import { createStructuredSelector } from "reselect";
import {
  makeSelectResponse,
  makeSelectError,
  makeSelectTemplateObject,
} from "../../store/Template/TemplateReselect";
import {
  validateIsInputEmpty,
  validateIsInputListEmpty,
} from "../../utils/InputValidation";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { MultiInputField } from "../../components/MultiInputField/MultiInputField";

const SmsEditor = (props) => {
  const {
    initiateSaveTemplate,
    response,
    error,
    initiateSendSms,
    initiateSetResponseToDefault,
    initiateSetErrorToDefault,
    initiateEditTemplate,
    templateObject,
  } = props;

  const [loading, showLoader] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [nameError, setNameError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [valueError, setValueError] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [toList, setToList] = useState([{}]);
  const [toCounter, setToCounter] = useState(1);

  const buttons = [
    {
      name: "Test",
      color: "danger",
      testId: "showTestModal",
      handler: () => {
        handleShowTestModal();
      },
    },
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

  const initiateErrorMessage = () => {
    setNameError("");
    setSubjectError("");
    setDescriptionError("");
    setValueError("");
  };

  const initiateToListError = () => {
    setToList(() => {
      toList.forEach((list) => {
        list.error = "";
      });
      return [...toList];
    });
  };

  useEffect(() => {
    if (templateObject !== null) {
      const { name, subject, description, value } = templateObject;
      setName(name);
      setSubject(subject);
      setDescription(description);
      setValue(value);
    } else {
      setName("");
      setSubject("");
      setDescription("");
      setValue("");
    }
  }, [templateObject]);

  useEffect(() => {
    if (error) toast.error(error);
    if (response) toast.success(response);
    initiateSetErrorToDefault();
    initiateSetResponseToDefault();
  }, [error, response]);

  useEffect(() => {
    setToList([
      {
        error: "",
        name: `To0`,
        value: "",
        placeholder: "e.g: +6010......",
        required: true,
        setInput: setToList,
      },
    ]);
  }, []);

  const handleSave = () => {
    initiateErrorMessage();
    const type = "Sms";
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
        setSubjectError("Template Subject is required.");
      if (validationResult.includes("description"))
        setDescriptionError("Template Description is required.");
      if (validationResult.includes("value"))
        setDescriptionError("Message is required.");
    }
    setShowSaveModal(false);
  };

  const handleCancel = () => {
    History.push("/home");
  };

  const handleShowTestModal = () => {
    initiateErrorMessage();
    initiateToListError();
    const validationResult = validateIsInputEmpty({ subject, value });
    if (validationResult.length === 0) {
      setShowTestModal(true);
    } else {
      if (validationResult.includes("subject"))
        setSubjectError("Template Subject is required.");
      if (validationResult.includes("value"))
        setValueError("Message is required.");
    }
  };

  const handleSendSms = () => {
    initiateErrorMessage();
    initiateToListError();

    const emptyListValidation = validateIsInputListEmpty(toList);

    if (emptyListValidation.length === 0) {
      let phoneList = [];
      toList.forEach((list) => {
        phoneList.push(list.value);
      });
      initiateSendSms(phoneList, value, subject);
    } else {
      if (emptyListValidation.length > 0) {
        setToList(() => {
          emptyListValidation.forEach((fieldName) => {
            let foundIndex = toList.findIndex(
              (list) => list.name === fieldName
            );
            toList[foundIndex].error = "Phone number is required";
          });
          return [...toList];
        });
      }
    }
  };

  const handleCreateToField = () => {
    setToList([
      ...toList,
      {
        error: "",
        name: `To${toCounter}`,
        value: "",
        placeholder: "eg: +6010.....",
        setInput: setToList,
      },
    ]);
    setToCounter(toCounter + 1);
  };

  const handleDeleteToField = (fieldName) => {
    setToList(toList.filter((field) => field.name !== fieldName));
  };

  const toField = {
    label: "To",
    inputFields: toList,
    required: true,
    createField: handleCreateToField,
    deleteField: handleDeleteToField,
  };

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
        <h4 className="text-center mb-5">SMS Template Editor</h4>
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
            <Form.Label className="required">Template Subject</Form.Label>
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
        </div>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label className="required">Template Description</Form.Label>
          <Form.Control
            as="textarea"
            maxLength="30"
            rows={3}
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
        <Form.Group className="mb-3" controlId="message">
          <Form.Label className="required">Message</Form.Label>
          <Form.Control
            as="textarea"
            maxLength="160"
            placeholder="Max Character 160"
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
      {showTestModal && (
        <Modal
          headerTitle={`Test SMS Template`}
          buttons={[
            {
              name: "Send SMS",
              color: "danger",
              handler: handleSendSms,
            },
            {
              name: "Back",
              color: "light",
              handler: () => setShowTestModal(false),
            },
          ]}
        >
          <MultiInputField {...toField} />
        </Modal>
      )}
      {showSaveModal && (
        <Modal
          headerTitle={`Are you sure you want to save SMS template`}
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
  error: makeSelectError(),
  response: makeSelectResponse(),
  templateObject: makeSelectTemplateObject(),
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
    initiateSendSms: (phoneList, value, subject) =>
      dispatch(
        TemplateActions.sendSmsRequest({
          phoneList,
          value,
          subject,
        })
      ),
    initiateSetResponseToDefault: () =>
      dispatch(TemplateActions.setResponseToDefault()),
    initiateSetErrorToDefault: () =>
      dispatch(TemplateActions.setErrorToDefault()),
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
  };
};

SmsEditor.propTypes = {
  initiateSaveTemplate: PropTypes.func,
  error: PropTypes.string,
  response: PropTypes.string,
  initiateSendSms: PropTypes.func,
  initiateSetResponseToDefault: PropTypes.func,
  initiateSetErrorToDefault: PropTypes.func,
  initiateEditTemplate: PropTypes.func,
  templateObject: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SmsEditor);
