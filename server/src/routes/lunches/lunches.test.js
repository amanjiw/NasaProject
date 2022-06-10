const request = require("supertest");
const app = require("../../app");

describe("Test GET /lunches", () => {
  test("it Should responde with 200 success ", async () => {
    const response = await request(app).get("/lunches").expect(200);
  });
});
