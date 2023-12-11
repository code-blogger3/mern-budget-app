import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

//routes import
import { userRouter } from "./routes/user.js";
import { budgetRouter } from "./routes/budget.js";
import { expenseRouter } from "./routes/expense.js";

app.use("/", userRouter);
app.use("/budget", budgetRouter);
app.use("/expense", expenseRouter);

export { app };
