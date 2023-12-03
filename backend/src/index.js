import dotenv from "dotenv";

import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config();

// PORT = 8001;
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8001, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
