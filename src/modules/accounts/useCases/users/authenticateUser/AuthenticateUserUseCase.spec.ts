import UsersRepositoryInMemory from "../../../repositories/users/in-memory/UsersRepositoryInMemory";

import AuthenticateUserUseCase from "./AuthenticateUserUseCase";
import CreateUserUseCase from "../createUser/CreateUserUseCase";

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
      name: "test",
      email: "user@test.com",
      driverLicense: "1234",
      password: "12345",
    });

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty("token");
  });
});
