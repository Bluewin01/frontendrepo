import React from "react";
import {
  Nav,
  NavLogo,
  NavMenu,
  NavLink,
  NavBtn,
  Logout,
} from "./NavbarElements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeSelectJwt } from "../../store/Auth/AuthReselect";
import { createStructuredSelector } from "reselect";
import { signOut } from "../../store/Auth/AuthActions";
import AIALogo from "./../../assets/images/aia-logo-white.png";
import store from "../../store";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = (props) => {
  const { jwt } = props;

  const handleLogout = () => {
    store.dispatch(signOut());
  };

  return (
    <Nav>
      <NavLogo to="/" data-testid="navlogo">
        <img src={AIALogo} alt="aia-logo-white" />
      </NavLogo>
      <NavMenu>
        <NavLink to="/">Notification Template Portal</NavLink>
      </NavMenu>
      {jwt === null ? null : (
        <NavBtn>
          <Logout type="primary" size="large" danger onClick={handleLogout}>
            <MdOutlineLogout size={24} /> Logout
          </Logout>
        </NavBtn>
      )}
    </Nav>
  );
};

const mapStateToProps = createStructuredSelector({
  jwt: makeSelectJwt(),
});

Navbar.propTypes = {
  jwt: PropTypes.object,
};

export default connect(mapStateToProps)(Navbar);
