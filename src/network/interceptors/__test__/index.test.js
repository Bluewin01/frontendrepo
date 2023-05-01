const index = require("../index");

// @ponicode
describe("index.isHandlerEnabled", () => {
  test("isHandlerEnabled true", () => {
    let result = index.isHandlerEnabled({
      handlerEnabled: true,
      hasOwnProperty: () => false,
    });
    expect(result).toMatchSnapshot();
  });

  test("isHandlerEnabled false", () => {
    let result = index.isHandlerEnabled({
      handlerEnabled: false,
      hasOwnProperty: () => false,
    });
    expect(result).toMatchSnapshot();
  });

  test("isHandlerEnabled hasOwnProperty true", () => {
    let result = index.isHandlerEnabled({
      handlerEnabled: false,
      hasOwnProperty: () => true,
    });
    expect(result).toMatchSnapshot();
  });

  test("isHandlerEnabled true", () => {
    let result = index.isHandlerEnabled({
      handlerEnabled: true,
      hasOwnProperty: () => true,
    });
    expect(result).toMatchSnapshot();
  });

  test("isHandlerEnabled undefined", () => {
    let result = index.isHandlerEnabled(undefined);
    expect(result).toMatchSnapshot();
  });
});

// @ponicode
describe("index.requestHandler", () => {
  test("requestHandler 404", () => {
    let result = index.requestHandler(404);
    expect(result).toMatchSnapshot();
  });

  test("requestHandler 200", () => {
    let result = index.requestHandler(200);
    expect(result).toMatchSnapshot();
  });

  test("requestHandler 400", () => {
    let result = index.requestHandler(400);
    expect(result).toMatchSnapshot();
  });

  test("requestHandler 500", () => {
    let result = index.requestHandler(500);
    expect(result).toMatchSnapshot();
  });

  test("requestHandler", () => {
    let result = index.requestHandler(Infinity);
    expect(result).toMatchSnapshot();
  });
});

// @ponicode
describe("index.successHandler", () => {
  test("index.successHandler 400", () => {
    let result = index.successHandler(400);
    expect(result).toMatchSnapshot();
  });

  test("index.successHandler 200", () => {
    let result = index.successHandler(200);
    expect(result).toMatchSnapshot();
  });

  test("index.successHandler 429", () => {
    let result = index.successHandler(429);
    expect(result).toMatchSnapshot();
  });

  test("index.successHandler 500", () => {
    let result = index.successHandler(500);
    expect(result).toMatchSnapshot();
  });

  test("index.successHandler 404", () => {
    let result = index.successHandler(404);
    expect(result).toMatchSnapshot();
  });

  test("index.successHandler", () => {
    let result = index.successHandler(-Infinity);
    expect(result).toMatchSnapshot();
  });
});

// @ponicode
// describe("index.errorHandler", () => {
//   test("errorHandler", () => {
//     let result = index.errorHandler({
//       config: "services_recontextualize_front_end.gif",
//     });
//     expect(result).toMatchSnapshot();
//   });
// });
