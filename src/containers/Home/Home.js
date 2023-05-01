import React, { useEffect } from "react";
import "./_HomeStyle.css";
import Content from "./Content";
import * as TemplateActions from "../../store/Template/TemplateActions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  makeSelectTemplateType,
  makeSelectError,
  makeSelectResponse,
} from "../../store/Template/TemplateReselect";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import AIALogo from "./../../assets/images/aiawhite-logo.png";

const Home = (props) => {
  const {
    templateType,
    initiateGetTemplateList,
    error,
    response,
    setTemplateObjectToEmpty,
    initiateSetResponseToDefault,
    initiateSetErrorToDefault,
  } = props;

  useEffect(() => {
    initiateGetTemplateList(templateType);
    setTemplateObjectToEmpty();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
    if (response) toast.success(response);
    initiateSetErrorToDefault();
    initiateSetResponseToDefault();
  }, [error, response]);

  const handleClick = (menu) => {
    initiateGetTemplateList(menu);
  };

  return (
    <>
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
      <section className="body">
        <Sidebar templateType={templateType} handleClick={handleClick} />
        <div className="content">
          <div className="text-center background">
            <img src={AIALogo} alt="aia-logo-white" />
          </div>
          <Content />
        </div>
      </section>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  templateType: makeSelectTemplateType(),
  error: makeSelectError(),
  response: makeSelectResponse(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    initiateGetTemplateList: (templateType) =>
      dispatch(TemplateActions.getTemplateListRequest({ templateType })),
    setTemplateObjectToEmpty: () =>
      dispatch(TemplateActions.setTemplateObjectToEmpty()),
    initiateSetResponseToDefault: () =>
      dispatch(TemplateActions.setResponseToDefault()),
    initiateSetErrorToDefault: () =>
      dispatch(TemplateActions.setErrorToDefault()),
  };
};

Content.propTypes = {
  initiateGetTemplateList: PropTypes.func,
  username: PropTypes.string,
  templateType: PropTypes.string,
  error: PropTypes.string,
  setTemplateObjectToEmpty: PropTypes.func,
  initiateSetResponseToDefault: PropTypes.func,
  initiateSetErrorToDefault: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
