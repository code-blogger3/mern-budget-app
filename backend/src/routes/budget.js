import express from "express";

import {
  deleteUserBudget,
  postUserBudget,
  sendUserBudget,
} from "../controllers/budget.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/:userID").get(sendUserBudget);

router.route("/:budgetID/:userID").delete(deleteUserBudget);

router.route("/").post(verifyToken, postUserBudget);

export { router as budgetRouter };
