import React, { useEffect, useState } from "react";
import AddBudgetModal from "./AddBudgetModal";
import Button from "@mui/joy/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import BudgetCards from "./BudgetCards";

function Home() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    // navigate("/auth");
  };
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

      {budgets.map((budget) => {
        return (
          <BudgetCards key={budget._id} name={budget.name} max={budget.max} />
        );
      })}

      <AddBudgetModal
        open={showAddBudgetModal}
        closeModal={setShowAddBudgetModal}
      />
    </>
  );
}

export default Home;
