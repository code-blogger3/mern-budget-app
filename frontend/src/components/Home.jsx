import React, { useEffect, useRef, useState } from "react";
import AddBudgetModal from "./AddBudgetModal";
import Button from "@mui/joy/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import BudgetCards from "./BudgetCards";
import AddExpenseModal from "./AddExpenseModal";

function Home() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState("");
  const [a, setA] = useState();

  const [budgets, setBudgets] = useState([]);
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    // navigate("/auth");
  };
  const ExpenseModalBudgetId = useRef();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  const getData = async () => {
    const result = await axios.get(`http://localhost:8001/budget/${userID}`);
    console.log(result.data);
    setBudgets(result.data.budgets);
  };
  useEffect(() => {
    getData();
  }, []);
  // useEffect(() => {
  //   ExpenseModalBudgetId.current = addExpenseModalBudgetId;
  //   setA(ExpenseModalBudgetId.current);
  // }, [addExpenseModalBudgetId, ExpenseModalBudgetId.current]);

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

      {budgets.map((budget) => {
        return (
          <BudgetCards
            key={budget._id}
            name={budget.name}
            max={budget.max}
            onAddExpenseClick={() => openAddExpenseModal(budget._id)}
            budgetID={budget._id}
          />
        );
      })}

      <AddBudgetModal
        open={showAddBudgetModal}
        closeModal={setShowAddBudgetModal}
      />
      <AddExpenseModal
        open={showAddExpenseModal}
        closeModal={setShowAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
      />
    </>
  );
}

export default Home;
