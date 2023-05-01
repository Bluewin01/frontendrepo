import { axiosInstance } from "../index";

describe("Test Axios Interceptors", () => {
  test("axiosInstance should return data and reject error correctly", () => {
    const Auth = jest.mock("../../../store", () => ({
      getState: jest.fn(() => ({
        Auth: jest.fn().mockReturnValue({ jwt: { token: "mockJwt" } }),
      })),
    }));

    expect(
      axiosInstance.interceptors.request.handlers[0].fulfilled({
        headers: { Authorization: `Bearer ${Auth}` },
      })
    ).toStrictEqual({
      headers: { Authorization: `Bearer ${Auth}` },
    });

    expect(
      axiosInstance.interceptors.response.handlers[0].fulfilled({
        data: "Same User",
      })
    ).toStrictEqual({
      data: "Same User",
    });

    expect(
      axiosInstance.interceptors.response.handlers[0].rejected({
        error: {
          response: {
            status: 404,
            statusText: "NotFound",
          },
        },
      })
    ).rejects.toMatchObject({
      error: {
        response: {
          status: 404,
          statusText: "NotFound",
        },
      },
    });
  });
});
