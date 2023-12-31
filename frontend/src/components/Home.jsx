import React, { useEffect, useState } from "react";
import AddBudgetModal from "./AddBudgetModal";
import Button from "@mui/joy/Button";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import BudgetCards from "./BudgetCards";
import AddExpenseModal from "./AddExpenseModal";
import ViewExpensesModal from "./ViewExpensesModal";
import { useRecoilState } from "recoil";
import { BudgetState } from "../states/atoms/BudgetExpense";
import { deleteBudget, getBudgets, postBudget } from "../api/api";

function Home() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState("");
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
    useState("");

  const [budgets, setBudgets] = useRecoilState(BudgetState);
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    // navigate("/auth");
  };

  function openAddExpenseModal(budgetID_or_userID) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetID_or_userID);
  }
  function openViewExpensesModal(budgetID) {
    setShowViewExpenseModal(true);
    setViewExpensesModalBudgetId(budgetID);
    console.log(budgetID);
  }

  const DeleteBudget = async (budgetID) => {
    try {
      await deleteBudget(budgetID);
      setBudgets(budgets.filter((budget) => budget._id != budgetID));
    } catch (error) {
      console.error(error);
    }
  };
  const GetBudgets = async () => {
    const result = await getBudgets(userID);
    // console.log(result.data);
    setBudgets(result.data.budgets);
  };

  const PostBudget = async (budget, userID, cookies) => {
    const result = await postBudget(budget, userID, cookies);
    console.log(result.data);
    setBudgets(result.data.budgets);
  };

  useEffect(() => {
    GetBudgets();
  }, []);

  return (
    <>
      <button onClick={logout}> Logout </button>
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

      {budgets.map((budget, id) => (
        <BudgetCards
          key={id}
          name={budget.name}
          max={budget.max}
          onAddExpenseClick={() => openAddExpenseModal(budget._id)}
          onViewExpensesClick={() => openViewExpensesModal(budget._id)}
          onDeleteBudget={() => DeleteBudget(budget._id)}
          budgetID={budget._id}
          setBudgets={setBudgets}
          budgets={budgets}
        />
      ))}

      <AddBudgetModal
        open={showAddBudgetModal}
        closeModal={setShowAddBudgetModal}
        PostBudget={PostBudget}
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
      />
    </>
  );
}

export default Home;
