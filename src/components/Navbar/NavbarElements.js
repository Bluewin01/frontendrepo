import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

export const Nav = styled.nav`
  background: #d31145;
  height: 65px;
  display: flex;
  justify-content: space-between;
  padding: 0 calc((80vw - 1000px) / 2);
  z-index: 10;
`;

export const NavLogo = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: bold;

  &.active {
    color: #fff;
  }

  img {
    width: 44px;
  }
`;

export const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  width: 100vw;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 2.5rem;
  font-weight: bold;

  &.active {
    color: #fff;
  }

  &:hover {
    background-color: rgba(85, 67, 68, 0.4);
    text-decoration: none;
    color: #fff;
  }

  img {
    width: 44px;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 30px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #d31145;
  padding: 10px 40px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.5);

  &:hover {
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #d31145;
  }
`;

export const Logout = styled.button`
  display: flex
  align-items: center;
  background-color: #d31145;
  box-shadow: 0 3px 8px 0 rgb(4 0 0 / 50%);
  border: none;
  border-radius: 10px;
  color: white;
  padding: 0px 10px 0px 10px;
  font-weight: 500;
  height: 40px;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #dce2e994;
  }
`;
