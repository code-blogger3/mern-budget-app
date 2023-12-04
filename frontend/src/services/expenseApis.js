import axios from "axios";

async function postExpense(expenseDetails, userID) {
  const result = await axios.post("http://localhost:8001/expense", {
    userID,
    ...expenseDetails,
  });
  return result;
}

async function deleteExpense(expenseID) {
  await axios.delete(`http://localhost:8001/expense/${expenseID}`);
}

async function getExpenses(userID) {
  const result = await axios.get(`http://localhost:8001/expense/${userID}`);
  return result;
}

export { postExpense, deleteExpense, getExpenses };
