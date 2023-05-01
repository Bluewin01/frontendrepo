export const validateIsInputEmpty = (props) => {
  const inputValues = Object.values(props);
  const inputKeys = Object.keys(props);
  let invalidInputList = [];

  inputValues.forEach((input, index) => {
    if (
      input === "" ||
      input === undefined ||
      input === null ||
      input.match(/^ *$/) !== null
    ) {
      invalidInputList.push(index);
    }
  });

  let validationResult = [];
  invalidInputList.forEach((fieldIndex) => {
    validationResult.push(inputKeys[fieldIndex]);
  });

  return validationResult;
};

export const validateIsInputListEmpty = (props) => {
  let invalidInputList = [];

  props.forEach((input) => {
    if (
      input.value === "" ||
      input.value === undefined ||
      input.value === null ||
      input.value.match(/^ *$/) !== null
    ) {
      invalidInputList.push(input.name);
    }
  });

  return invalidInputList;
};

export const validateEmailFormat = (props) => {
  const inputValues = Object.values(props);
  const inputKeys = Object.keys(props);
  let invalidEmailList = [];

  inputValues.forEach((email, index) => {
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      invalidEmailList.push(index);
    }
  });

  let validationResult = [];
  invalidEmailList.forEach((fieldIndex) => {
    validationResult.push(inputKeys[fieldIndex]);
  });

  return validationResult;
};

export const validateEmailListFormat = (props) => {
  let invalidEmailList = [];

  props.forEach((email) => {
    if (email.value !== "") {
      if (
        !email.value.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        invalidEmailList.push(email.name);
      }
    }
  });

  return invalidEmailList;
};
