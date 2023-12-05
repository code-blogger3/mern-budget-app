import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";

function UncategorizedBudget({ onViewExpensesClick }) {
  return (
    <Card color="primary" orientation="vertical" size="sm">
      <h6>Uncategorized Expenses</h6>
      <Button onClick={onViewExpensesClick} variant="outlined">
        View Expenses
      </Button>
    </Card>
  );
}

export default UncategorizedBudget;
