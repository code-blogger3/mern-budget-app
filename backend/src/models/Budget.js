import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    max: { type: Number, required: true },
  },
  { timestamps: true }
);

export const BudgetModel = mongoose.model("Budget", BudgetSchema);
