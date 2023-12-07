import React from "react";
import BudgetCards from "./BudgetCards";
import { deleteBudget } from "../services/budgetApis";
import { BudgetState, ExpenseState } from "../states/atoms/BudgetExpense";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Grid } from "@mui/joy";
import UncategorizedBudget from "./UncategorizedBudget";
import "../styles/budgetList.css";

function BudgetCardList({
  openAddExpenseModal,
  openViewExpensesModal,
  userID,
}) {
  const [budgets, setBudgets] = useRecoilState(BudgetState);
  const expenses = useRecoilValue(ExpenseState);

  const totalBudgetAmount = budgets.reduce(
    (total, budget) => total + budget.max,
    0
  );
  const totalExpenseAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

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
      <section>
        <p>
          Your total budget is {totalBudgetAmount} and expense is{" "}
          {totalExpenseAmount}.
        </p>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          sx={{ width: "100%" }}
        >
          {budgets?.length > 0 &&
            budgets.map((budget, id) => {
              return (
                <Grid xs={3.8} sx={{ margin: "" }} key={id}>
                  <BudgetCards
                    name={budget.name}
                    max={budget.max}
                    onAddExpenseClick={() => openAddExpenseModal(budget._id)}
                    onViewExpensesClick={() =>
                      openViewExpensesModal(budget._id)
                    }
                    onDeleteBudget={() => DeleteBudget(budget._id)}
                    budgetID={budget._id}
                    userID={userID}
                  />
                </Grid>
              );
            })}
          <Grid xs={3.8} sx={{ margin: "" }}>
            <UncategorizedBudget
              onViewExpensesClick={() => openViewExpensesModal(userID)}
            />
          </Grid>
        </Grid>
      </section>
    </>
  );
}

export default BudgetCardList;
