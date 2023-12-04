import axios from "axios";

async function getBudgets(userID) {
  const result = await axios.get(`http://localhost:8001/budget/${userID}`);
  return result;
}

async function deleteBudget(budgetID, userID) {
  await axios.delete(`http://localhost:8001/budget/${budgetID}/${userID}`);
}

async function postBudget(budget, userID) {
  const result = await axios.post(
    "http://localhost:8001/budget",
    { ...budget, userID }
    // {
    //   headers: { authorization: cookies.access_token },
    // }
  );
  return result;
}

export { getBudgets, deleteBudget, postBudget };
