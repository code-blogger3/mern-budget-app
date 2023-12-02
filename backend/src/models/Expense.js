import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    budgetID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Budget" }],
  },
  { timestamps: true }
);

export const ExpenseModel = mongoose.model("Expense", ExpenseSchema);
