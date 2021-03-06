const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisConnent } = require("../../services/mongo");

describe("Luanches API ", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisConnent();
  });

  describe("Test GET /lunches", () => {
    test("it Should responde with 200 success ", async () => {
      const response = await request(app).get("/lunches").expect(200);
    });
  });

  describe("Test POST /lunches", () => {
    const completeLunchData = {
      mission: "USS EN7",
      rocket: "NCC JT4-N",
      target: "Kepler-1652 b",
      launchDate: "January 4, 2028",
    };

    const completeLunchDataWithINvalidDate = {
      mission: "USS EN7",
      rocket: "NCC JT4-N",
      target: "Kepler-1652 b",
      launchDate: "amanj",
    };

    const lunchDataWithoutDate = {
      mission: "USS EN7",
      rocket: "NCC JT4-N",
      target: "Kepler-1652 b",
    };

    // testing success responsd
    test("It should be responde with 201 success", async () => {
      const response = await request(app)
        .post("/lunches")
        .send(completeLunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);

      expect(response.body).toMatchObject(lunchDataWithoutDate);
    });

    // testing missing required property
    test("it should catch missing required property", async () => {
      const response = await request(app)
        .post("/lunches")
        .send(lunchDataWithoutDate)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required lunch property",
      });
    });

    // testing invalid Date format
    test("it should catch invalid date ", async () => {
      const response = await request(app)
        .post("/lunches")
        .send(completeLunchDataWithINvalidDate)
        .expect(400);

      expect(response.body).toStrictEqual({ error: "Invalid Lunch Date" });
    });
  });
});
