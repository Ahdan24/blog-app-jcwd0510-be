import app from "../../src/app";
import { prismaMock } from "../prisma";
import request from "supertest";
import * as argonLib from "../../src/lib/argon";

const reqBody = {
  email: "mock@mail.com",
  password: "mockPassword123",
};

beforeAll(() => {
  // ini bakalan dijalankan sebelum testing pertama dijalankan
})

beforeEach(() =>{
  // ini bakalan dijalankan sebelum setiap testing dijalankan
})

afterEach(() => {
  // ini bakalan dijalankan setelah setiap testing dijalankan
})

afterAll(() => {
  // ini bakalan dijalankan setelah semua testing dijalankan
})

describe("POST /auth/login", () => {
  it("should login succsessfully", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      name: "mock name",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest.spyOn(argonLib, "comparePassword").mockResolvedValue(true);
    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should return error if email not found", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid credentials");
  });

  it("should return error if password not match", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      name: "mock name",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    jest.spyOn(argonLib, "comparePassword").mockResolvedValue(false);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid credentials");
  });
});
