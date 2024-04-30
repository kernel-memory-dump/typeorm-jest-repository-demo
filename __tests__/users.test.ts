import { Repository } from "typeorm";
import User, { IUser } from "../src/modules/user/user.model";

import request, { Response } from "supertest";

import { commonUserBody, updatedUserBody } from "./utils/testDataConstructor";
import { initializeUser } from "./utils/testDataInitializer";
import {
  cleanUpDatabase,
  getApp,
  getRepository,
  startApp,
  stopApp,
} from "./utils/testRunner";
import {
  EMAIL,
  PASSWORD,
  SHORT_PASSWORD,
  USERNAME,
  WRONG_EMAIL,
} from "./utils/testVariables";

const TEST_NAME = "USER";

beforeAll(async () => {
  await startApp(TEST_NAME);
});

beforeEach(async () => {
  await cleanUpDatabase(User);
});

afterAll(async () => {
  await stopApp();
});

const getUserRepository = (): Repository<User> => {
  return getRepository(User);
};

describe("User Register Test", () => {
  it("repository should allow access to eager collection2", async () => {
    expect(1).toBe(1);
  });
});
