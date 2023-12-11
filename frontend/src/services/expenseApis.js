import axios from "axios";

async function postExpense(expenseDetails, userID) {
  const result = await axios.post("/api/expense", {
    userID,
    ...expenseDetails,
  });
  return result;
}

async function deleteExpense(expenseID, userID) {
  await axios.delete(`/api/expense/${expenseID}/${userID}`);
}

async function getExpenses(userID) {
  const result = await axios.get(`/api/expense/${userID}`);
  return result;
}

export { postExpense, deleteExpense, getExpenses };
