import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import { useRecoilState, useRecoilValue } from "recoil";
import { BudgetState, ExpenseState } from "../states/atoms/BudgetExpense";
import { deleteExpense } from "../services/expenseApis";
import { Button } from "@mui/joy";

function ViewExpensesModal({ budgetID, closeModal, open, userID }) {
  const [expenses, setExpenses] = useRecoilState(ExpenseState);
  const budgets = useRecoilValue(BudgetState);
  const [budgetName, setBudgetName] = useState("");
  const filteredExpenses = expenses.filter(
    (expense) => expense.budgetID == budgetID
  );
  useEffect(() => {
    const filteredBudget = budgets.filter((budget) => budget._id == budgetID);
    setBudgetName(filteredBudget[0]?.name);
  }, []);

  const DeleteExpense = async (expenseID) => {
    try {
      await deleteExpense(expenseID, userID);
      setExpenses(expenses.filter((expense) => expense._id != expenseID));
    } catch (error) {
      console.error(error);
    }
  };

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
            {filteredExpenses.map((expense) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={3}
                key={expense._id}
              >
                <p>{expense.description}</p>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => DeleteExpense(expense._id)}
                >
                  X
                </Button>
              </Stack>
            ))}
          </Stack>
          <Button size="sm" variant="plain" onClick={() => closeModal(false)}>
            Cancel
          </Button>
        </Sheet>
      </Modal>
    </section>
  );
}

export default ViewExpensesModal;
