import express from "express";
import {
  deleteUserExpense,
  postUserExpense,
  sendUserExpenses,
} from "../controllers/expense.js";

const router = express.Router();

router.route("/:userID").get(sendUserExpenses);

router.route("/:expenseID/:userID").delete(deleteUserExpense);

router.route("/").post(postUserExpense);

export { router as expenseRouter };
