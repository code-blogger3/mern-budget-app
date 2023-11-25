import express from "express";
import mongoose from "mongoose";
// import { verifyToken } from "./user.js";
import { BudgetModel } from "../models/Budget.js";
import { ExpenseModel } from "../models/Expense.js";

const router = express.Router();

router.post("/", async (req, res) => {
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
});

export { router as expenseRouter };
