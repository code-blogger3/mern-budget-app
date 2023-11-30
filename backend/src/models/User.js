import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  budgets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Budget" }],
  uncategorizedExpenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

export const UserModel = mongoose.model("User", UserSchema);
