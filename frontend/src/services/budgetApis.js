import axios from "axios";

async function getBudgets(userID) {
  const result = await axios.get(`/api/budget/${userID}`);
  return result;
}

async function deleteBudget(budgetID, userID) {
  await axios.delete(`/api/${budgetID}/${userID}`);
}

async function postBudget(budget, userID) {
  const result = await axios.post(
    "/api/budget",
    { ...budget, userID }
    // {
    //   headers: { authorization: cookies.access_token },
    // }
  );
  return result;
}

export { getBudgets, deleteBudget, postBudget };
