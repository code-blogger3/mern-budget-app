import axios from "axios";

export async function getBudgets(userID) {
  const result = await axios.get(`http://localhost:8001/budget/${userID}`);
  return result;
}

export async function postExpense(expense, budgetID, userID) {
  await axios.post("http://localhost:8001/expense", {
    ...expense,
    budgetID,
    userID,
  });
}

export async function deleteExpense(expenseID) {
  await axios.delete(`http://localhost:8001/expense/${expenseID}`);
}

export async function getBudgetExpenses(budgetID, userID) {
  const result = await axios.get(
    `http://localhost:8001/expense/${budgetID}/${userID}`
  );
  return result;
}

export async function deleteBudget(budgetID) {
  await axios.delete(`http://localhost:8001/budget/${budgetID}`);
}

export async function postBudget(budget, userID, cookies) {
  const result = await axios.post(
    "http://localhost:8001/budget",
    { ...budget, userID },
    {
      headers: { authorization: cookies.access_token },
    }
  );
  return result;
}
