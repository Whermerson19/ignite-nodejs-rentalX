
import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";
import CreateUserUseCase from "../createUser/CreateUserUseCase";
import AppError from "@shared/errors/AppError";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able to create a session", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "user@test.com",
      driverLicense: "1234",
      password: "12345",
    });

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: "12345",
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "fake@email.com",
        password: "12345",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user = await createUserUseCase.execute({
        name: "User Test",
        email: "user@test.com",
        driverLicense: "1234",
        password: "12345",
      });

      await authenticateUserUseCase.execute({
        email: "user@test.com",
        password: "incorret password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
