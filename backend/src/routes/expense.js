import express from "express";
import mongoose from "mongoose";
// import { verifyToken } from "./user.js";
import { BudgetModel } from "../models/Budget.js";
import { ExpenseModel } from "../models/Expense.js";
import { UserModel } from "../models/User.js";

const router = express.Router();

router.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    await sendExpense(userID, res);
  } catch (err) {
    res.status(500).json(err);
  }
});

async function sendExpense(userID, res) {
  try {
    const user = await UserModel.findById(userID)
      .populate("Expenses")
      .select("-password -__v");

    // Rename property before sending response
    const responseUser = {
      expenses: user.Expenses,
    };

    res.status(200).json(responseUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

// async function sendCategorizedExpense(budgetID, res) {
//   try {
//     const budget = await BudgetModel.findById(budgetID).populate("expenses");
//     res.status(200).json(budget);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }
// safe
router.delete("/:expenseID", async (req, res) => {
  const expenseID = req.params.expenseID;

  try {
    const result = await ExpenseModel.deleteOne({ _id: expenseID });

    if (result.deletedCount > 0) {
      // Document was deleted successfully
      res.status(200).json({ message: "Expense deleted successfully." });
    } else {
      // No matching document found
      res.status(404).json({ message: "Expense not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (request, response) => {
  const { userID, ...expenseDetails } = request.body;

  try {
    const result = await handleUserExpense(userID, expenseDetails);
    response
      .status(200)
      .json({ message: "Expense saved successfully", data: result });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

async function handleUserExpense(userID, expenseDetails) {
  const user = await UserModel.findById(userID);
  const expense = new ExpenseModel({
    _id: new mongoose.Types.ObjectId(),
    ...expenseDetails,
  });

  const result = await expense.save();
  user.Expenses.push(result._id);
  await user.save();
  return result;
}

// async function handleBudgetExpense(budgetID, description, amount) {
//   const budget = await BudgetModel.findById(budgetID);
//   const expense = new ExpenseModel({
//     _id: new mongoose.Types.ObjectId(),
//     description,
//     amount,
//   });

//   const result = await expense.save();
//   budget.expenses.push(result._id);
//   await budget.save();
// }

export { router as expenseRouter };
