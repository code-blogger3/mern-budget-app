import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { UserModel } from "../models/User.js";
// import { verifyToken } from "./user.js";
import { BudgetModel } from "../models/Budget.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const sendUserBudget = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.userID)
    .populate("budgets")
    .select("-password -__v -username -_id -expenses");

  try {
    res
      .status(200)
      .json(new ApiResponse(200, "Budgets are send successfully", user));
  } catch (err) {
    res
      .status(500)
      .json(new ApiError(500, "Budgets are not being able to send", err));
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
      res
        .status(200)
        .json(new ApiResponse(200, "Budget deleted successfully."));
    } else {
      // No matching document found
      res.status(404).json(new ApiError(404, "Budget not found."));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(new ApiError(500, "Internal Server Error", err));
  }
});

const postUserBudget = asyncHandler(async (req, res) => {
  try {
    const { userID, name, max } = req.body;

    const budget = await createBudget(name, max);

    const updatedUser = await addUserBudget(userID, budget._id);

    res.status(201).json(
      new ApiResponse(201, "budget saved successfully", {
        budgets: updatedUser.budgets,
      })
    );
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Could not able to post budget", error));
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
