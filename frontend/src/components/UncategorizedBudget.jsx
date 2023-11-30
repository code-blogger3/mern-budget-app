import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";

function UncategorizedBudget({ onViewExpensesClick }) {
  return (
    <Card color="primary" orientation="vertical" size="sm">
      {/* <Button onClick={onAddExpenseClick} variant="solid">
          Add Expenses
        </Button> */}
      <Button onClick={onViewExpensesClick} variant="outlined">
        View Expenses
      </Button>
    </Card>
  );
}

export default UncategorizedBudget;
