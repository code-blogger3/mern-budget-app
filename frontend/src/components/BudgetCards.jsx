import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import axios from "axios";

function BudgetCards({
  name,
  max,
  onAddExpenseClick,
  onViewExpensesClick,
  budgetID,
}) {
  const deleteExpense = async () => {
    try {
      await axios.delete(`http://localhost:8001/budget/${budgetID}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card color="primary" orientation="vertical" size="sm">
      <div>{name}</div>
      <div>{max}</div>
      <div>
        <div>
          <Button onClick={onAddExpenseClick} variant="solid">
            Add Expenses
          </Button>
          <Button onClick={onViewExpensesClick} variant="outlined">
            View Expenses
          </Button>
        </div>
        <button onClick={deleteExpense}>delete</button>
      </div>
    </Card>
  );
}

export default BudgetCards;
