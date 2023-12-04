import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/joy/LinearProgress";

function BudgetCards({
  name,
  max,
  onAddExpenseClick,
  onViewExpensesClick,
  onDeleteBudget,
}) {
  const [progressBarLevel, setProgressBarLevel] = useState(0);

  // async function GetExpenseAmount() {
  //   const percentage = await getExpensesAmount(budgetID, userID);
  //   console.log(percentage);
  //   setProgressBarLevel(percentage);
  // }
  // useEffect(() => {
  //   GetExpenseAmount();
  // }, []);
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
