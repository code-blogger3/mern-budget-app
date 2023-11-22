// import { PORT, mongoDBURL } from "./config.js";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { budgetRouter } from "./routes/budget.js";
import { expenseRouter } from "./routes/expense.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/budget", budgetRouter);
app.use("/expense", expenseRouter);
// PORT = 8001;
mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(8001, () => {
      console.log(`App is listening to port: ${8001}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
