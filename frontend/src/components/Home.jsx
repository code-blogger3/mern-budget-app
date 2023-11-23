import React, { useState } from "react";
import AddBudgetModal from "./AddBudgetModal";
import Button from "@mui/joy/Button";
function Home() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => setShowAddBudgetModal(true)}
      >
        Open modal
      </Button>
      <AddBudgetModal
        open={showAddBudgetModal}
        closeModal={setShowAddBudgetModal}
      />
    </>
  );
}

export default Home;
