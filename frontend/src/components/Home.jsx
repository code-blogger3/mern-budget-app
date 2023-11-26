import React, { useEffect, useRef, useState } from "react";
import AddBudgetModal from "./AddBudgetModal";
import Button from "@mui/joy/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import BudgetCards from "./BudgetCards";
import AddExpenseModal from "./AddExpenseModal";
import ViewExpensesModal from "./ViewExpensesModal";

function Home() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState("");
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
    useState("");

  const [budgets, setBudgets] = useState([]);
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    // navigate("/auth");
  };

  function openAddExpenseModal(budgetID) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetID);
  }
  function openViewExpensesModal(budgetID) {
    setShowViewExpenseModal(true);
    setViewExpensesModalBudgetId(budgetID);
    console.log(budgetID);
  }
  const getData = async () => {
    const result = await axios.get(`http://localhost:8001/budget/${userID}`);
    console.log(result.data);
    setBudgets(result.data.budgets);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <button onClick={logout}> Logout </button>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => setShowAddBudgetModal(true)}
      >
        Open modal
      </Button>

      {budgets.map((budget) => (
        <BudgetCards
          key={budget._id}
          name={budget.name}
          max={budget.max}
          onAddExpenseClick={() => openAddExpenseModal(budget._id)}
          onViewExpensesClick={() => openViewExpensesModal(budget._id)}
          budgetID={budget._id}
        />
      ))}

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
      />
    </>
  );
}

export default Home;
