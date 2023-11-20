// import booksRoute from "./routes/booksRoute.js";
// import { PORT, mongoDBURL } from "./config.js";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { userRouter } from "./routes/user.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
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
