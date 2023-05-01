import { connect } from "react-redux";
import EmailEditor from "react-email-editor";
import React, { useRef, useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import * as TemplateActions from "../../store/Template/TemplateActions";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";
import "../../assets/css/editor.css";
import History from "../../routes/History";
import { createStructuredSelector } from "reselect";
import { makeSelectJwt } from "../../store/Auth/AuthReselect";
import {
  makeSelectResponse,
  makeSelectError,
  makeSelectTemplateObject,
  makeSelectReady,
} from "../../store/Template/TemplateReselect";
import {
  validateIsInputEmpty,
  validateIsInputListEmpty,
  validateEmailListFormat,
  validateEmailFormat,
} from "../../utils/InputValidation";
import { Button } from "react-bootstrap";
import { InputField } from "../../components/InputField/InputField";
import { MultiInputField } from "../../components/MultiInputField/MultiInputField";

const Email = (props) => {
  const {
    initiateSaveTemplate,
    initiateSendEmail,
    error,
    response,
    initiateSetResponseToDefault,
    initiateSetErrorToDefault,
    initiateEditTemplate,
    templateObject,
    ready,
    initiateSetReady,
  } = props;

  const [loading, showLoader] = useState(false);
  const emailEditorRef = useRef(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [fromError, setFromError] = useState("");
  const [nameError, setNameError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [toList, setToList] = useState([]);
  const [ccList, setCcList] = useState([]);
  const [bccList, setBccList] = useState([]);
  const [toCounter, setToCounter] = useState(1);
  const [ccCounter, setCcCounter] = useState(1);
  const [bccCounter, setbccCounter] = useState(1);

  const buttons = [
    {
      name: "Test",
      color: "danger",
      handler: () => {
        setShowTestModal(true);
      },
    },
    {
      name: "Save",
      color: "danger",
      handler: () => {
        setShowSaveModal(true);
      },
    },
    {
      name: "Cancel",
      color: "light",
      handler: () => {
        setShowCancelModal(true);
      },
    },
  ];

  const initiateErrorMessage = () => {
    setFromError("");
    setSubjectError("");
    setDescriptionError("");
    setFromError("");
    setToList(() => {
      toList.forEach((email) => {
        email.error = "";
      });
      return [...toList];
    });
  };

  useEffect(() => {
    if (templateObject !== null) {
      const { name, subject, description } = templateObject;
      setName(name);
      setSubject(subject);
      setDescription(description);
      showLoader(true);
      setTimeout(() => {
        showLoader(false);
        onLoad(templateObject);
      }, 3000);
    } else {
      setName("");
      setSubject("");
      setDescription("");
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
        placeholder: "e.g: email@aia.com",
        required: true,
        setInput: setToList,
      },
    ]);

    setCcList([
      {
        error: "",
        name: `Cc0`,
        value: "",
        placeholder: "e.g: email@aia.com",
        setInput: setCcList,
      },
    ]);

    setBccList([
      {
        error: "",
        name: `Bcc0`,
        value: "",
        placeholder: "e.g: email@aia.com",
        setInput: setBccList,
      },
    ]);
  }, []);

  const handleSave = () => {
    initiateErrorMessage();
    const validationResult = validateIsInputEmpty({
      name,
      subject,
      description,
    });
    if (validationResult.length === 0) {
      emailEditorRef.current.editor.exportHtml(
        (data) => {
          const type = "Email";
          const { design, html } = data;
          const rawValue = design;
          const value = html.replace(/^\s+|\s+$|\n/gm, "").replace(/"/gm, "'");
          if (templateObject !== null) {
            initiateEditTemplate(
              name,
              subject,
              description,
              value,
              type,
              rawValue
            );
          } else {
            initiateSaveTemplate(
              name,
              subject,
              description,
              value,
              type,
              rawValue
            );
          }
          setTimeout(() => {
            History.push("/home");
          }, 1000);
        },
        {
          cleanup: true,
        }
      );
    } else {
      if (validationResult.includes("name")) setNameError("Name is required.");
      if (validationResult.includes("subject"))
        setSubjectError("Subject is required.");
      if (validationResult.includes("description"))
        setDescriptionError("Desciprtion is required.");
    }
  };

  const handleCancel = () => {
    History.push("/home");
  };

  const handleSendEmail = () => {
    initiateErrorMessage();
    const emptyValidation = validateIsInputEmpty({ from, subject });
    const emptyListValidation = validateIsInputListEmpty(toList);
    const formatValidation = validateEmailFormat({ from });
    const toListFormatValidation = validateEmailListFormat(toList);
    const ccListFormatvalidation = validateEmailListFormat(ccList);
    const bccListFormatvalidation = validateEmailListFormat(bccList);

    if (
      emptyValidation.length === 0 &&
      emptyListValidation.length === 0 &&
      formatValidation.length === 0
    ) {
      var to = [];
      var cc = [];
      var bcc = [];

      toList.forEach((list) => {
        to.push(list.value);
      });
      ccList.forEach((list) => {
        cc.push(list.value);
      });
      bccList.forEach((list) => {
        bcc.push(list.value);
      });

      emailEditorRef.current.editor.exportHtml(
        (data) => {
          const { html } = data;
          const value = html.replace(/^\s+|\s+$|\n/gm, "").replace(/"/gm, "'");
          initiateSendEmail(to, from, value, subject, cc, bcc);
        },
        {
          cleanup: true,
        }
      );
    } else {
      if (emptyListValidation.length > 0) {
        setToList(() => {
          emptyListValidation.forEach((fieldName) => {
            let foundIndex = toList.findIndex(
              (list) => list.name === fieldName
            );
            toList[foundIndex].error = "To is required.";
          });
          return [...toList];
        });
      }
      if (toListFormatValidation.length > 0) {
        setToList(() => {
          toListFormatValidation.forEach((fieldName) => {
            let foundIndex = toList.findIndex(
              (list) => list.name === fieldName
            );
            toList[foundIndex].error = "Invalid email format.";
          });
          return [...toList];
        });
      }
      if (ccListFormatvalidation.length > 0) {
        setCcList(() => {
          ccListFormatvalidation.forEach((fieldName) => {
            let foundIndex = ccList.findIndex(
              (list) => list.name === fieldName
            );
            ccList[foundIndex].error = "Invalid email format.";
          });
          return [...ccList];
        });
      }
      if (bccListFormatvalidation.length > 0) {
        setBccList(() => {
          bccListFormatvalidation.forEach((fieldName) => {
            let foundIndex = bccList.findIndex(
              (list) => list.name === fieldName
            );
            bccList[foundIndex].error = "Invalid email format";
          });
          return [...bccList];
        });
      }

      if (emptyValidation.includes("from")) {
        setFromError("From is required.");
      } else if (formatValidation.includes("from")) {
        setFromError("Invalid email format.");
      }
      if (emptyValidation.includes("subject"))
        setSubjectError("Subject is required.");
    }
  };

  const handleCreateEmailFields = () => {
    setToList([
      ...toList,
      {
        error: "",
        name: `To${toCounter}`,
        value: "",
        placeholder: "e.g: email@aia.com",
        setInput: setToList,
      },
    ]);
    setToCounter(toCounter + 1);
  };

  const handleCreateCcFields = () => {
    setCcList([
      ...ccList,
      {
        error: "",
        name: `To${ccCounter}`,
        value: "",
        placeholder: "e.g: email@aia.com",
        setInput: setCcList,
      },
    ]);
    setCcCounter(ccCounter + 1);
  };

  const handleCreateBccFields = () => {
    setBccList([
      ...bccList,
      {
        error: "",
        name: `To${bccCounter}`,
        value: "",
        placeholder: "e.g: email@aia.com",
        setInput: setBccList,
      },
    ]);
    setbccCounter(bccCounter + 1);
  };

  const handleDeleteEmailFields = (fieldName) => {
    setToList(toList.filter((field) => field.name !== fieldName));
  };

  const handleDeleteCcFields = (fieldName) => {
    setCcList(ccList.filter((field) => field.name !== fieldName));
  };

  const handleDeleteBccFields = (fieldName) => {
    setBccList(bccList.filter((field) => field.name !== fieldName));
  };

  window.onbeforeunload = function () {
    return "Refresh will make you lose your changes";
  };

  const onLoad = (templateObject) => {
    const { rawValue } = templateObject.rawValue;
    if (emailEditorRef.current.editor) {
      emailEditorRef.current.editor.loadDesign(rawValue);
    }
  };

  const onReady = () => {
    initiateSetReady();
  };

  const nameField = {
    value: name,
    error: nameError,
    name: "Name",
    type: "text",
    placeholder: "Enter template name here",
    required: true,
    setInput: setName,
    setError: setNameError,
  };

  const subjectField = {
    value: subject,
    error: subjectError,
    name: "Subject",
    type: "text",
    placeholder: "Enter subject here",
    required: true,
    setInput: setSubject,
    setError: setSubjectError,
  };

  const descriptionField = {
    value: description,
    error: descriptionError,
    name: "Description",
    type: "text",
    placeholder: "Enter description here",
    required: true,
    setInput: setDescription,
    setError: setDescriptionError,
  };

  const toField = {
    label: "To",
    required: true,
    inputFields: toList,
    createField: handleCreateEmailFields,
    deleteField: handleDeleteEmailFields,
  };

  const fromField = {
    value: from,
    error: fromError,
    name: "From",
    type: "text",
    placeholder: "e.g: email@aia.com",
    required: true,
    error: fromError,
    setInput: setFrom,
    setError: setFromError,
  };

  const ccField = {
    label: "Cc",
    inputFields: ccList,
    createField: handleCreateCcFields,
    deleteField: handleDeleteCcFields,
  };

  const bccField = {
    label: "Bcc",
    inputFields: bccList,
    createField: handleCreateBccFields,
    deleteField: handleDeleteBccFields,
  };

  return (
    <div className="text-center">
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
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
      <div className="input__form">
        {ready
          ? buttons.map((button) => {
              return (
                <Button
                  key={button.name}
                  className="Button"
                  variant={button.color}
                  onClick={button.handler}
                >
                  {button.name}
                </Button>
              );
            })
          : null}
        {showTestModal && (
          <Modal
            headerTitle={`Test Email Template`}
            buttons={[
              {
                name: "Send Email",
                color: "danger",
                handler: handleSendEmail,
              },
              {
                name: "Cancel",
                color: "light",
                handler: () => setShowTestModal(false),
              },
            ]}
          >
            <MultiInputField {...toField} />
            <InputField {...fromField} />
            <InputField {...subjectField} />
            <MultiInputField {...ccField} />
            <MultiInputField {...bccField} />
          </Modal>
        )}
        {showSaveModal && (
          <Modal
            headerTitle={`Are you sure you want to save Email template?`}
            buttons={[
              {
                name: "Confirm",
                color: "danger",
                handler: handleSave,
              },
              {
                name: "Cancel",
                color: "light",
                handler: () => setShowSaveModal(false),
              },
            ]}
          >
            <InputField {...nameField} />
            <InputField {...subjectField} />
            <InputField {...descriptionField} />
          </Modal>
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
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  response: makeSelectResponse(),
  jwt: makeSelectJwt(),
  templateObject: makeSelectTemplateObject(),
  ready: makeSelectReady(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    initiateSaveTemplate: (name, subject, description, value, type, rawValue) =>
      dispatch(
        TemplateActions.saveTemplateRequest({
          name,
          subject,
          description,
          value,
          type,
          rawValue,
        })
      ),
    initiateSendEmail: (to, from, value, subject, cc, bcc) =>
      dispatch(
        TemplateActions.sendEmailRequest({
          to,
          from,
          value,
          subject,
          cc,
          bcc,
        })
      ),
    initiateSetResponseToDefault: () =>
      dispatch(TemplateActions.setResponseToDefault()),
    initiateSetErrorToDefault: () =>
      dispatch(TemplateActions.setErrorToDefault()),
    initiateEditTemplate: (
      name,
      subject,
      description,
      value,
      type,
      rawValue,
      userCode
    ) =>
      dispatch(
        TemplateActions.editTemplateRequest({
          name,
          subject,
          description,
          value,
          type,
          rawValue,
          userCode,
        })
      ),
    initiateSetReady: () => dispatch(TemplateActions.setReady()),
  };
};

Email.propTypes = {
  initiateSaveTemplate: PropTypes.func,
  initiateSendEmail: PropTypes.func,
  response: PropTypes.string,
  error: PropTypes.string,
  initiateSetResponseToDefault: PropTypes.func,
  initiateSetErrorToDefault: PropTypes.func,
  initiateEditTemplate: PropTypes.func,
  templateObject: PropTypes.object,
  initiateSetReady: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);
