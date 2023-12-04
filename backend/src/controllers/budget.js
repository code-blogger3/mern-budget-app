import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { UserModel } from "../models/User.js";
// import { verifyToken } from "./user.js";
import { BudgetModel } from "../models/Budget.js";

const sendUserBudget = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.userID)
    .populate("budgets")
    .select("-password -__v");

  try {
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

const deleteUserBudget = asyncHandler(async (req, res) => {
  const { budgetID, userID } = req.params;

  try {
    const result = await BudgetModel.deleteOne({ _id: budgetID });
    const user = await UserModel.findById(userID);
    user.budgets.remove(budgetID);
    await user.save();
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

const postUserBudget = asyncHandler(async (req, res) => {
  try {
    const { userID, name, max } = req.body;

    const budget = await createBudget(name, max);

    const updatedUser = await addUserBudget(userID, budget._id);

    res.status(201).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      budgets: updatedUser.budgets,
    });
  } catch (error) {
    console.error("Error creating budget:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const createBudget = async (name, max) => {
  const budget = new BudgetModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    max,
  });

  try {
    const result = await budget.save();
    return result;
  } catch (error) {
    throw error;
  }
};

const addUserBudget = async (userId, budgetId) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { budgets: budgetId } },
      { new: true }
    ).populate("budgets");
    return user;
  } catch (error) {
    throw error;
  }
};

export { sendUserBudget, deleteUserBudget, postUserBudget };
