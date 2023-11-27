import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import { deleteExpense, getBudgetExpenses } from "../api/api";

function ViewExpensesModal({ budgetID, closeModal, open }) {
  const [expenses, setExpenses] = useState([]);
  const [budgetName, setBudgetName] = useState("");

  const GetBudgetExpenses = async () => {
    await getBudgetExpenses(budgetID);
    console.log(result.data.expenses);
    setBudgetName(result.data.name);
    setExpenses(result.data.expenses);
  };
  const DeleteExpense = async (expenseID) => {
    try {
      await deleteExpense(expenseID);
      setExpenses(expenses.filter((expense) => expense._id != expenseID));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GetBudgetExpenses();
  }, [budgetID, open]);

  // console.log(expenses);
  return (
    <section>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => closeModal(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Expenses of {budgetName}
          </Typography>

          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            {expenses.map((expense) => (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                key={expense._id}
              >
                <span>{expense.description}</span>
                <button onClick={() => DeleteExpense(expense._id)}>X</button>
              </Stack>
            ))}
          </Stack>

          <button onClick={() => closeModal(false)}>Cancel</button>
        </Sheet>
      </Modal>
    </section>
  );
}

export default ViewExpensesModal;
