import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
// import { verifyToken } from "./user.js";
import { ExpenseModel } from "../models/Expense.js";
import { UserModel } from "../models/User.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const sendUserExpenses = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  try {
    await sendExpense(userID, res);
  } catch (err) {
    res.status(500).json(new ApiError(500, "Failed to send expenses", err));
  }
});

async function sendExpense(userID, res) {
  try {
    const user = await UserModel.findById(userID)
      .populate("expenses")
      .select("-password -__v -budgets -username -_id");

    res
      .status(200)
      .json(new ApiResponse(200, "Expenses are send successfully", user));
  } catch (err) {
    res
      .status(500)
      .json(new ApiError(500, "Budgets are not being able to send", err));
  }
}

const deleteUserExpense = asyncHandler(async (req, res) => {
  const { expenseID, userID } = req.params;

  try {
    const result = await ExpenseModel.deleteOne({ _id: expenseID });
    console.log(result);
    const user = await UserModel.findById(userID);
    user.expenses.remove(expenseID);
    await user.save();

    console.log("Expense removed from user successfully");
    if (result.deletedCount > 0) {
      // Document was deleted successfully
      res
        .status(200)
        .json(new ApiResponse(200, "Expense deleted successfully"));
    } else {
      // No matching document found
      res.status(404).json(new ApiError(404, "Expense not found"));
    }
  } catch (err) {
    res.status(500).json(new ApiError(404, "Internal Server Error", err));
  }
});

const postUserExpense = asyncHandler(async (request, response) => {
  const { userID, ...expenseDetails } = request.body;

  try {
    const result = await handleUserExpense(userID, expenseDetails);
    response
      .status(200)
      .json(new ApiResponse(200, "Expense saved successfully", result));
  } catch (error) {
    response
      .status(500)
      .json(new ApiError(500, "Could not able to post budget", err));
  }
});

async function handleUserExpense(userID, expenseDetails) {
  const user = await UserModel.findById(userID);
  const expense = new ExpenseModel({
    _id: new mongoose.Types.ObjectId(),
    ...expenseDetails,
  });

  const result = await expense.save();
  user.expenses.push(result._id);
  await user.save();
  return result;
}
export { sendUserExpenses, deleteUserExpense, postUserExpense };
