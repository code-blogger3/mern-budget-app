import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";
import { BudgetModel } from "../models/Budget.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const user = await UserModel.findById(req.body.userID);
  //getting id
  try {
    const result = await UserModel.findById({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const user = await UserModel.findById(req.body.userId);
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    max: req.body.max,
  });

  try {
    const result = await recipe.save();
    user.budgets.push(result._id);
    res.status(201).json({ budget: user.budgets });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

export { router as budgetRouter };
