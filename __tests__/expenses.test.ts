import { FindOneOptions, Repository } from "typeorm";
import Expense, { IExpense } from "../src/modules/expense/expense.model";
import User from "../src/modules/user/user.model";

import request, { Response } from "supertest";

import { expenseBody, updateExpenseBody } from "./utils/testDataConstructor";
import {
  initializeAltUser,
  initializeExpense,
  initializeUserAndToken,
} from "./utils/testDataInitializer";
import {
  cleanUpDatabase,
  getApp,
  getRepository,
  startApp,
  stopApp,
} from "./utils/testRunner";

const TEST_NAME = "EXPENSE";

beforeAll(async () => {
  await startApp(TEST_NAME);
});

beforeEach(async () => {
  await cleanUpDatabase(Expense);
  await cleanUpDatabase(User);
});

afterAll(async () => {
  await stopApp();
});

const getUserRepository = (): Repository<User> => {
  return getRepository(User);
};

const getExpenseRepository = (): Repository<Expense> => {
  return getRepository(Expense);
};

const initializeMultipleExpenses = async (user: User): Promise<Expense[]> => {
  let expenses: Expense[] = [];

  for (let index = 0; index < 5; index++) {
    let tempBody: IExpense = expenseBody;
    let tempExpense: Expense = new Expense();
    Object.assign(tempExpense, {
      ...tempBody,
      amount: tempBody.amount + index,
      userId: user.id,
    });
    expenses.push(tempExpense);
  }

  return await getExpenseRepository().save(expenses);
};

describe("Expense Creation Test", () => {

  it("repository should allow access to eager collection", async () => {
    const userAndToken: [User, String] = await initializeUserAndToken();
    const response: Response<any> = await request(getApp())
      .post(`/api/v1/expenses`)
      .set("Authorization", `Bearer ${userAndToken[1]}`)
      .send(expenseBody);
    expect(response.statusCode).toBe(201);

    // TEST repo
    const userRepository = await getUserRepository();
    const options: FindOneOptions<User> = {
      where: { id:userAndToken[0].id},
    };
    const user: User = await userRepository.findOne(options);

    const expense = user.expense;
    expect(expense).toBeDefined();
    expect(user.roles).toBeDefined();
    console.log(JSON.stringify(user, null, 4));
    
  });



});
