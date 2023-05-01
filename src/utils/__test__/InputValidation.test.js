const { mockComponent } = require("react-dom/test-utils");
const {
  validateIsInputEmpty,
  validateIsInputListEmpty,
  validateEmailFormat,
  validateEmailListFormat,
} = require("../InputValidation");
// @ponicode
describe("validate Is Input Empty Validation", () => {
  test("validate Input", () => {
    const result = validateIsInputEmpty({});
    expect(result).toMatchSnapshot();
  });

  test("validate input mockComponent", () => {
    const result = validateIsInputEmpty(mockComponent);
    expect(result).toMatchSnapshot();
  });
});

describe("Test Is Input List Empty Validation", () => {
  test("Empty array is returned when all inputs are valid", () => {
    const mockPhoneList = [
      { name: "Phone1", value: "+12345" },
      { name: "Phone2", value: "+54321" },
    ];
    const result = validateIsInputListEmpty(mockPhoneList);
    expect(result).toEqual([]);
  });

  test("Array with invalid inputs is returned", () => {
    const mockPhoneList = [
      { name: "Phone1", value: "" },
      { name: "Phone2", value: " " },
      { name: "Phone3", value: undefined },
      { name: "Phone4", value: null },
      { name: "Phone5", value: "+123" },
    ];
    const result = validateIsInputListEmpty(mockPhoneList);
    expect(result).toEqual(["Phone1", "Phone2", "Phone3", "Phone4"]);
  });
});
describe("Test Email Format Validation", () => {
  test("Empty array is returned when all email format are valid", () => {
    const email = "xxxx-xx.xxx@aia.com";
    const result = validateEmailFormat({ email });
    expect(result).toEqual([]);
  });

  test("Array with invalid email format is returned", () => {
    const email1 = "xxxx-xx.xxx@aia.com";
    const email2 = "121";
    const email3 = "";
    const result = validateEmailFormat({ email1, email2, email3 });
    expect(result).toEqual(["email2", "email3"]);
  });
});

describe("Test Email List Format Validation", () => {
  test("Empty array is returned when all email format are valid", () => {
    const mockEmailList = [
      { name: "Email1", value: "xxxx-xx.xxx@aia.com" },
      { name: "Email2", value: "xxxxxx@aia.com" },
    ];
    const result = validateEmailListFormat(mockEmailList);
    expect(result).toEqual([]);
  });

  test("Array with invalid email format is returned", () => {
    const mockEmailList = [
      { name: "Email1", value: "asd" },
      { name: "Email2", value: "123" },
      { name: "Email3", value: "xxxx-xx.xxx@aia.com" },
      { name: "Email4", value: "" },
    ];
    const result = validateEmailListFormat(mockEmailList);
    expect(result).toEqual(["Email1", "Email2"]);
  });
});
