import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
// import "../styles/addBudgetModal.css";

function AddBudgetModal({ closeModal, open }) {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [budget, setBudget] = useState({
    name: "",
    max: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBudget({ ...budget, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:8001/budget",
        { ...budget, userID },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("buget created");
      //   navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
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
              This is the modal title
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              <button onClick={() => closeModal(false)}>Cancel</button>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={budget.name}
                  onChange={handleChange}
                />
                <label htmlFor="max">Maximum amount</label>
                <input
                  type="number"
                  name="max"
                  id="max"
                  value={budget.max}
                  onChange={handleChange}
                />
                <button>add</button>
              </form>
            </Typography>
          </Sheet>
        </Modal>
      </section>
    </>
  );
}

export default AddBudgetModal;
