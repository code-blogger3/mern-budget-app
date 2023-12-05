import React from "react";
import BudgetCards from "./BudgetCards";
import { deleteBudget } from "../services/budgetApis";
import { BudgetState } from "../states/atoms/BudgetExpense";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Grid } from "@mui/joy";
import UncategorizedBudget from "./UncategorizedBudget";

function BudgetCardList({
  openAddExpenseModal,
  openViewExpensesModal,
  userID,
}) {
  const [budgets, setBudgets] = useRecoilState(BudgetState);

  const DeleteBudget = async (budgetID) => {
    try {
      await deleteBudget(budgetID, userID);
      setBudgets(budgets.filter((budget) => budget._id != budgetID));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ width: "100%" }}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {budgets?.length > 0 &&
          budgets.map((budget, id) => {
            return (
              <Grid xs={3.5} sx={{ margin: "12px 10px 10px 28px" }} key={id}>
                <BudgetCards
                  name={budget.name}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget._id)}
                  onViewExpensesClick={() => openViewExpensesModal(budget._id)}
                  onDeleteBudget={() => DeleteBudget(budget._id)}
                  budgetID={budget._id}
                  userID={userID}
                />
              </Grid>
            );
          })}
        <Grid xs={3.8} sx={{ margin: "12px 10px 10px 28px" }}>
          <UncategorizedBudget
            onViewExpensesClick={() => openViewExpensesModal(userID)}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default BudgetCardList;
