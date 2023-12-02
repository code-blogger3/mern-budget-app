import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import { Form } from "react-bootstrap";
import { useRef, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { postExpense } from "../api/api";
import { useRecoilState } from "recoil";
import { BudgetState } from "../states/atoms/BudgetExpense";

function AddExpenseModal({ open, closeModal, defaultBudgetId }) {
  const budgets = useRecoilState(BudgetState);
  const budgetList = budgets[0];
  const budgetIdRef = useRef();
  const [expense, setExpense] = useState({
    description: "",
    amount: 0,
  });
  const userID = useGetUserID();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await postExpense(expense, budgetIdRef.current?.value, userID);
      //   auth
    } catch (error) {
      console.error(error);
    }
  };
  function clean() {
    closeModal(false);
    setExpense({
      description: "",
      amount: 0,
    });
  }
  function triggerFunctions() {
    handleSubmit();
    clean();
  }
  return (
    <>
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
              Add Expense
            </Typography>
            <div>
              <button onClick={() => closeModal(false)}>Cancel</button>

              <label htmlFor="name">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={expense.description}
                onChange={handleChange}
              />
              <label htmlFor="max">Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={expense.amount}
                onChange={handleChange}
              />
              <div>
                <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                  <option value={userID}>Uncategorized</option>
                  {budgetList.map((budget) => (
                    <option key={budget._id} value={budget._id}>
                      {budget.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <button onClick={triggerFunctions}>add</button>
            </div>
          </Sheet>
        </Modal>
      </section>
    </>
  );
}

export default AddExpenseModal;
