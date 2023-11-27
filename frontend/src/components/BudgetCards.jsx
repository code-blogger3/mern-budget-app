import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";

function BudgetCards({
  name,
  max,
  onAddExpenseClick,
  onViewExpensesClick,
  onDeleteBudget,
}) {
  return (
    <Card color="primary" orientation="vertical" size="sm">
      <div>{name}</div>
      <div>{max}</div>
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
