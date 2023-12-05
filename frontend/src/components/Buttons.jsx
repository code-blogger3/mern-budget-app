import Button from "@mui/joy/Button";
// import Add from "@mui/icons-material/Add";

function Buttons({ setShowAddBudgetModal, openAddExpenseModal, userID }) {
  return (
    <div>
      <Button
        // className="button"
        variant="outlined"
        color="neutral"
        onClick={() => setShowAddBudgetModal(true)}
        sx={{ margin: "0 27px" }}
      >
        Add Budget
      </Button>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => openAddExpenseModal(userID)}
      >
        Add Expense
      </Button>
    </div>
  );
}

export default Buttons;
