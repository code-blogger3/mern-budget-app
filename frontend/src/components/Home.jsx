import React, { useEffect, useState } from "react";
import AddBudgetModal from "./AddBudgetModal";
import { useGetUserID } from "../hooks/useGetUserID";
import AddExpenseModal from "./AddExpenseModal";
import ViewExpensesModal from "./ViewExpensesModal";
import { useSetRecoilState } from "recoil";
import { BudgetState, ExpenseState } from "../states/atoms/BudgetExpense";
import { getBudgets } from "../services/budgetApis";
import BudgetCardList from "./BudgetCardList";
import { getExpenses } from "../services/expenseApis";
import Buttons from "./Buttons";

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

  function openAddExpenseModal(budgetID) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetID);
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
      <Buttons
        setShowAddBudgetModal={setShowAddBudgetModal}
        openAddExpenseModal={openAddExpenseModal}
        userID={userID}
      />

      <BudgetCardList
        openAddExpenseModal={openAddExpenseModal}
        openViewExpensesModal={openViewExpensesModal}
        userID={userID}
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
