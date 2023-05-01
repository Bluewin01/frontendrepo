import React, { useState, useEffect } from "react";
import "./_HomeStyle.css";
import History from "../../routes/History";
import sampleTemplateList from "../../assets/sampleTemplate/sampleTemplate.json";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  makeSelectTemplateList,
  makeSelectTemplateType,
} from "../../store/Template/TemplateReselect";
import PropTypes from "prop-types";
import { Card } from "../../components/Card/Card";
import * as TemplateActions from "../../store/Template/TemplateActions";
import { Modal } from "../../components/Modal/Modal";
import "react-toastify/dist/ReactToastify.css";

const Content = (props) => {
  const {
    templateType,
    templateList,
    initiateViewTemplate,
    initiateDeleteTemplate,
  } = props;
  const sampleTemplate = sampleTemplateList.filter((sample) => {
    return sample.type === templateType;
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");

  const createTemplate = () => {
    if (templateType === "Email") {
      History.push("/email");
    }
    if (templateType === "Sms") {
      History.push("/sms");
    }
    if (templateType === "Push") {
      History.push("/push");
    }
  };

  const editTemplate = (templateId) => {
    if (templateType === "Email") {
      initiateViewTemplate(templateId);
      History.push("/email");
    }
    if (templateType === "Sms") {
      initiateViewTemplate(templateId);
      History.push("/sms");
    }
    if (templateType === "Push") {
      initiateViewTemplate(templateId);
      History.push("/push");
    }
  };

  const deleteTemplate = () => {
    initiateDeleteTemplate(selectedTemplateId, templateType);
    setShowDeleteModal(false);
  };

  return (
    <section className="content">
      <label>Sample Templates</label>
      <div className="templateCategory">
        {sampleTemplate.map((sample) => (
          <Card
            key={sample.id}
            cardType={"templateList"}
            template={sample}
            deleteTemplate={deleteTemplate}
            buttons={[
              {
                name: "Use Template",
                onClick: () => alert("This feature is not available yet"),
              },
            ]}
          />
        ))}
      </div>
      <label>My Templates</label>
      <div className="templateCategory">
        <Card cardType={"createTemplate"} createTemplate={createTemplate} />
        {templateList.map((template) => (
          <Card
            key={template.id}
            cardType={"templateList"}
            template={template}
            buttons={[
              { name: "Edit", onClick: editTemplate },
              {
                name: "Delete",
                onClick: () => {
                  setShowDeleteModal(true);
                  setSelectedTemplateId(template.id);
                },
              },
            ]}
          />
        ))}
      </div>
      {showDeleteModal === true ? (
        <Modal
          headerTitle={`Are you sure to delete ${templateType} template?`}
          showBody={false}
          buttons={[
            {
              name: "Confirm",
              color: "danger",
              handler: deleteTemplate,
            },
            {
              name: "Cancel",
              color: "light",
              handler: () => setShowDeleteModal(false),
            },
          ]}
        />
      ) : null}
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  templateType: makeSelectTemplateType(),
  templateList: makeSelectTemplateList(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    initiateViewTemplate: (templateId) =>
      dispatch(
        TemplateActions.viewTemplateRequest({
          templateId,
        })
      ),
    initiateDeleteTemplate: (templateId, templateType) =>
      dispatch(
        TemplateActions.deleteTemplateRequest({
          templateId,
          templateType,
        })
      ),
  };
};

Content.propTypes = {
  templateType: PropTypes.string,
  templateList: PropTypes.array,
  initiateViewTemplate: PropTypes.func,
  initiateDeleteTemplate: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
