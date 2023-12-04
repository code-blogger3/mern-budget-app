import React from "react";
import BudgetCards from "./BudgetCards";
import { deleteBudget } from "../services/budgetApis";
import { BudgetState } from "../states/atoms/BudgetExpense";
import { useRecoilState, useSetRecoilState } from "recoil";

function BudgetCardList({
  openAddExpenseModal,
  openViewExpensesModal,
  userID,
}) {
  const [budgets, setBudgets] = useRecoilState(BudgetState);

  const DeleteBudget = async (budgetID) => {
    try {
      await deleteBudget(budgetID, userID); //pop func
      setBudgets(budgets.filter((budget) => budget._id != budgetID));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        {budgets?.length > 0 &&
          budgets.map((budget, id) => {
            return (
              <BudgetCards
                key={id}
                name={budget.name}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget._id)}
                onViewExpensesClick={() => openViewExpensesModal(budget._id)}
                onDeleteBudget={() => DeleteBudget(budget._id)}
                budgetID={budget._id}
                userID={userID}
              />
            );
          })}
      </div>
    </>
  );
}

export default BudgetCardList;
