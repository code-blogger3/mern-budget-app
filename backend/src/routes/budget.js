import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/User.js";
import { verifyToken } from "./user.js";
import { BudgetModel } from "../models/Budget.js";

const router = express.Router();

router.get("/:userID", async (req, res) => {
  const user = await UserModel.findById(req.params.userID)
    .populate("budgets")
    .select("-password -__v");

  try {
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:budgetID", async (req, res) => {
  const budgetID = req.params.budgetID;

  try {
    const result = await BudgetModel.deleteOne({ _id: budgetID });

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
  const user = await UserModel.findById(req.body.userID);
  const budget = new BudgetModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    max: req.body.max,
  });

  try {
    const result = await budget.save();
    user.budgets.push(result._id);
    await user.save();
    res.status(201);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as budgetRouter };
