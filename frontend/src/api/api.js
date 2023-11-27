import axios from "axios";

export async function getBudgets(userID) {
  const result = await axios.get(`http://localhost:8001/budget/${userID}`);
  return result;
}

export async function postExpense(expense, budgetID) {
  await axios.post("http://localhost:8001/expense", {
    ...expense,
    budgetID,
  });
}

export async function deleteExpense(expenseID) {
  await axios.delete(`http://localhost:8001/expense/${expenseID}`);
}

export async function getBudgetExpenses(budgetID) {
  const result = await axios.get(`http://localhost:8001/expense/${budgetID}`);
  return result;
}

export async function deleteBudget(budgetID) {
  await axios.delete(`http://localhost:8001/budget/${budgetID}`);
}
