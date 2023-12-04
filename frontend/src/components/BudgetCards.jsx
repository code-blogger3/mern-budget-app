import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import { useRecoilState, useRecoilValue } from "recoil";
import { ExpenseState } from "../states/atoms/BudgetExpense";

function BudgetCards({
  name,
  max,
  onAddExpenseClick,
  onViewExpensesClick,
  onDeleteBudget,
  budgetID,
}) {
  const [progressBarLevel, setProgressBarLevel] = useState(0);
  const expenses = useRecoilValue(ExpenseState);
  // console.log(expenses);
  async function getExpenseAmount() {
    const filteredExpenses = expenses.filter(
      (expense) => expense.budgetID == budgetID
    );

    const amount = filteredExpenses.reduce(
      (total, filteredExpense) => total + filteredExpense.amount,
      0
    );
    const percentage = (amount / max) * 100;
    setProgressBarLevel(percentage);
  }
  useEffect(() => {
    getExpenseAmount();
  }, [expenses]);
  // console.log(amount);
  return (
    <Card color="primary" orientation="vertical" size="sm">
      <div>
        {name}
        <span>
          {progressBarLevel}/{max}
        </span>
      </div>
      <div>{max}</div>
      <LinearProgress determinate value={progressBarLevel} />
      <div>
        <Button onClick={onAddExpenseClick} variant="solid">
          Add Expenses
        </Button>
        <Button onClick={onViewExpensesClick} variant="outlined">
          View Expenses
        </Button>
        <button onClick={onDeleteBudget}>delete</button>
      </div>
    </Card>
  );
}

export default BudgetCards;
