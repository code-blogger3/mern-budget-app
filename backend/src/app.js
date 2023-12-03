import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
app.use(cookieParser());

//routes import
import { userRouter } from "./routes/user.js";
import { budgetRouter } from "./routes/budget.js";
import { expenseRouter } from "./routes/expense.js";

app.use("/auth", userRouter);
app.use("/budget", budgetRouter);
app.use("/expense", expenseRouter);

export { app };
