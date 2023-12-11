import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import { useRecoilValue } from "recoil";
import { ExpenseState } from "../states/atoms/BudgetExpense";
import { currencyFormatter } from "../utils/currencyFormatter";

function BudgetCards({
  name,
  max,
  onAddExpenseClick,
  onViewExpensesClick,
  onDeleteBudget,
  budgetID,
}) {
  const [progressBarLevel, setProgressBarLevel] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const expenses = useRecoilValue(ExpenseState);

  async function getExpenseAmount() {
    const filteredExpenses = expenses.filter(
      (expense) => expense.budgetID == budgetID
    );

    const amount = filteredExpenses.reduce(
      (total, filteredExpense) => total + filteredExpense.amount,
      0
    );
    setTotalAmount(amount);
    setProgressBarLevel((amount / max) * 100);
  }
  useEffect(() => {
    getExpenseAmount();
  }, [expenses]);
  return (
    <Card color="primary" orientation="vertical" size="sm">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h6>{name}</h6>
        <span>
          {currencyFormatter.format(totalAmount)}/
          {currencyFormatter.format(max)}
        </span>
      </div>
      <div>{currencyFormatter.format(max)}</div>
      <LinearProgress determinate value={progressBarLevel} />
      <div>
        <Button onClick={onAddExpenseClick} size="sm" variant="solid">
          Add Expenses
        </Button>
        <Button
          onClick={onViewExpensesClick}
          size="sm"
          variant="plain"
          sx={{ margin: "0 9px" }}
        >
          View Expenses
        </Button>
        <Button
          onClick={onDeleteBudget}
          variant="plain"
          size="sm"
          color="danger"
        >
          delete
        </Button>
      </div>
    </Card>
  );
}

export default BudgetCards;
