import React, { useEffect, useState } from "react";
import AddBudgetModal from "./AddBudgetModal";
import Button from "@mui/joy/Button";
import { useGetUserID } from "../hooks/useGetUserID";
import AddExpenseModal from "./AddExpenseModal";
import ViewExpensesModal from "./ViewExpensesModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BudgetState, ExpenseState } from "../states/atoms/BudgetExpense";
import { getBudgets } from "../services/budgetApis";
import UncategorizedBudget from "./UncategorizedBudget";
import BudgetCardList from "./BudgetCardList";
import { getExpenses } from "../services/expenseApis";

function Home() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState("");
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
    useState("");
  const setBudgets = useSetRecoilState(BudgetState);
  const setExpenses = useSetRecoilState(ExpenseState);
  const userID = useGetUserID();

  function openAddExpenseModal(budgetID_or_userID) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetID_or_userID);
  }
  function openViewExpensesModal(budgetID) {
    setShowViewExpenseModal(true);
    setViewExpensesModalBudgetId(budgetID);
  }

  const GetBudgets = async () => {
    const result = await getBudgets(userID);
    setBudgets(result.data.budgets);
  };
  const GetExpenses = async () => {
    const result = await getExpenses(userID);
    setExpenses(result.data.expenses);
  };

  useEffect(() => {
    GetBudgets();
    GetExpenses();
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => setShowAddBudgetModal(true)}
      >
        Add Budget
      </Button>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => openAddExpenseModal(userID)}
      >
        Add Expense
      </Button>

      <BudgetCardList
        openAddExpenseModal={openAddExpenseModal}
        openViewExpensesModal={openViewExpensesModal}
        userID={userID}
      />
      <UncategorizedBudget
        onViewExpensesClick={() => openViewExpensesModal(userID)}
      />

      <AddBudgetModal
        open={showAddBudgetModal}
        closeModal={setShowAddBudgetModal}
      />
      <AddExpenseModal
        open={showAddExpenseModal}
        closeModal={setShowAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
      />
      <ViewExpensesModal
        budgetID={viewExpensesModalBudgetId}
        open={showViewExpenseModal}
        closeModal={setShowViewExpenseModal}
        userID={userID}
      />
    </>
  );
}

export default Home;

// async function getExpensesAmount(budgetID, userID) {
//   const result = await getBudgetExpenses(budgetID, userID);
//   const amount = result.data.expenses.reduce(
//     (total, expense) => total + expense.amount,
//     0
//   );
//   const percentage = (amount / max) * 100;
//   return percentage;
// }
