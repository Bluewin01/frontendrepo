const TemplateApis = require("../TemplateApis");

jest.mock("../../../network/apis");

describe("TemplateApis.default.templateApis", () => {
  test("templateApis", async () => {
    await TemplateApis.default.templateApis();
    expect(TemplateApis.default.templateApis).toBeDefined();
  });
});

describe("TemplateApis.default.getTemplateApis", () => {
  test("getTemplateApis", async () => {
    await TemplateApis.default.getTemplateApis();
    expect(TemplateApis.default.getTemplateApis).toBeDefined();
  });
});

describe("TemplateApis.default.putTemplateApis", () => {
  test("putTemplateApis", async () => {
    await TemplateApis.default.putTemplateApis();
    expect(TemplateApis.default.putTemplateApis).toBeDefined();
  });
});

describe("TemplateApis.default.deleteTemplateApis", () => {
  test("deleteTemplateApis", async () => {
    await TemplateApis.default.deleteTemplateApis();
    expect(TemplateApis.default.deleteTemplateApis).toBeDefined();
  });
});
