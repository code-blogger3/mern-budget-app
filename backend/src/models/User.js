import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    budgets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Budget" }],
    uncategorizedExpenses: [
      {
        description: { type: String, required: true },
        amount: { type: Number, required: true },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
