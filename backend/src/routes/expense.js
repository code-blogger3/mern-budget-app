import express from "express";
import mongoose from "mongoose";
// import { verifyToken } from "./user.js";
import { BudgetModel } from "../models/Budget.js";
import { ExpenseModel } from "../models/Expense.js";
import { UserModel } from "../models/User.js";

const router = express.Router();

router.get("/:budgetID", async (req, res) => {
  const budget = await BudgetModel.findById(req.params.budgetID).populate(
    "expenses"
  );
  try {
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json(err);
  }
});
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

router.post("/", async (req, res) => {
  if (req.body.budgetID == req.body.userID) {
    const user = await UserModel.findById(req.body.userID);
    const expense = new ExpenseModel({
      _id: new mongoose.Types.ObjectId(),
      description: req.body.description,
      amount: req.body.amount,
    });
    try {
      const result = await expense.save();
      user.uncategorizedExpenses.push(result._id);
      await user.save();
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    const budget = await BudgetModel.findById(req.body.budgetID);
    const expense = new ExpenseModel({
      _id: new mongoose.Types.ObjectId(),
      description: req.body.description,
      amount: req.body.amount,
    });

    try {
      const result = await expense.save();
      budget.expenses.push(result._id);
      await budget.save();
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

export { router as expenseRouter };
