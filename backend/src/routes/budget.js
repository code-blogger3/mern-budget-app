import express from "express";

import {
  deleteUserBudget,
  postUserBudget,
  sendUserBudget,
} from "../controllers/budget.js";

const router = express.Router();

router.route("/:userID").get(sendUserBudget);

router.route("/:budgetID").delete(deleteUserBudget);

router.route("/").post(postUserBudget);

export { router as budgetRouter };
