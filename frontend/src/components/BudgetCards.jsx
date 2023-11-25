import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";

function BudgetCards({
  name,
  max,
  onAddExpenseClick,
  budgetID,
  openAddExpenseModal,
}) {
  // console.log(budgetID);
  return (
    <Card color="primary" orientation="vertical" size="sm">
      <div>{name}</div>
      <div>{max}</div>
      <Button onClick={onAddExpenseClick} variant="solid">
        Add Expenses
      </Button>
      <Button onClick={function () {}} variant="outlined">
        View Expenses
      </Button>
    </Card>
  );
}

export default BudgetCards;
