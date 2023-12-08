import { useGetUserID } from "../hooks/useGetUserID";
// import { useCookies } from "react-cookie";
import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { postBudget } from "../services/budgetApis";
import { useSetRecoilState } from "recoil";
import { BudgetState } from "../states/atoms/BudgetExpense";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

function AddBudgetModal({ closeModal, open }) {
  const userID = useGetUserID();
  // const [cookies, _] = useCookies(["access_token"]);
  const [budget, setBudget] = useState({
    name: "",
    max: 0,
  });
  const setBudgets = useSetRecoilState(BudgetState);
  const PostBudget = async () => {
    try {
      const result = await postBudget(budget, userID);
      setBudgets(result.data.data.budgets);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBudget({ ...budget, [name]: value });
  };

  function clean() {
    closeModal(false);
    setBudget({
      name: "",
      max: 0,
    });
  }
  function triggerFunctions() {
    PostBudget();
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
              Add Budget
            </Typography>
            <div>
              <label htmlFor="name">Name of budget</label>
              <Input
                placeholder="Type in here…"
                variant="plain"
                size="lg"
                sx={{ margin: "13px" }}
                type="text"
                id="name"
                name="name"
                value={budget.name}
                onChange={handleChange}
              />
              <label htmlFor="max">Maximum amount</label>
              <Input
                variant="outlined"
                sx={{ margin: "13px" }}
                type="number"
                name="max"
                id="max"
                value={budget.max}
                onChange={handleChange}
              />
              <Button onClick={triggerFunctions} size="sm" variant="solid">
                Add
              </Button>
              <Button
                onClick={() => closeModal(false)}
                size="sm"
                variant="plain"
              >
                Cancel
              </Button>
            </div>
          </Sheet>
        </Modal>
      </section>
    </>
  );
}

export default AddBudgetModal;
