import styled from "styled-components";

export const Side = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 15%;
  padding: 5px 0px 0px 0px;
`;

export const SidebarMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const SidebarMenuItem = styled.button`
  width: 90%;
  padding: 10px 0px;
  margin: 5px 0px 0px 0px;
  font-weight: 500;
  transition: color 0.3s ease-in-out;
  border: none;
  background-color: transparent;
  color: ${(props) => (props.active ? "#fff" : "#555555")};
  ${(props) =>
    props.active
      ? ""
      : "&:hover { background-color: #ffe1e1; border-radius: 10px;}"}
`;

export const SidebarMenuIndicator = styled.div`
  position: absolute;
  height: 77px
  width: 90%;
  top: 5px;
  left: 50%;
  border-radius: 10px;
  background-color: #d31145;
  z-index: -1;
  transition: 0.3s ease-in-out;
  transform: ${(props) =>
    props.type === "Email"
      ? "translateX(-50%) translateY(0px)"
      : props.type === "Sms"
      ? "translateX(-50%) translateY(82px)"
      : "translateX(-50%) translateY(164px)"};
`;
