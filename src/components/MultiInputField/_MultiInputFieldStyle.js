import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  max-width: 260px;
  margin: 5px 0px;
`;

export const PlusButton = styled.div`
  display: flex;
  height: 35px;
  min-width: 35px;
  background-color: #d31145;
  border-radius: 50%;
  margin: 2px 0px 0px 10px;
  &:hover {
    display: flex;
    height: 35px;
    min-width: 35px;
    background-color: #f83c6e;
    border-radius: 50%;
  }
`;

export const plusIcon = {
  position: "flex",
  margin: "auto",
  fontSize: "150%",
  color: "white",
};

export const MinusButton = styled.div`
  display: flex;
  height: 35px;
  min-width: 35px;
  background-color: #cecece;
  border-radius: 50%;
  margin: 2px 0px 0px 10px;
  &:hover {
    display: flex;
    height: 35px;
    min-width: 35px;
    background-color: #f0f0f0;
    border-radius: 50%;
  }
`;

export const minusIcon = {
  position: "flex",
  margin: "auto",
  fontSize: "150%",
  color: "black",
};
