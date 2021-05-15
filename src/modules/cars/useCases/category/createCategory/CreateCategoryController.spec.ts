import { app } from '@shared/infra/http/app'
import request from "supertest";

import { Connection } from "typeorm";
import createConnection from "@shared/infra/typeorm";

import { hash } from "bcryptjs";
import { v4 } from "uuid";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = v4();
    const hashedPassword = await hash("admin", 10);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", "createdAt", "driverLicense")
      values('${id}', 'admin', 'admin@rentx.com.br', '${hashedPassword}', true, 'now()', 'XXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Name super test",
        description: "Description super test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should be able to create a new category with same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Name super test",
        description: "Description super test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
