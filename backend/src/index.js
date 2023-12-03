// import { PORT, mongoDBURL } from "./config.js";
import express from "express";
import dotenv from "dotenv";

import connectDB from "./db/index.js";
dotenv.config();

const app = express();
app.use(express.json());

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
// mongoose
//   .connect(process.env.mongoDBURL)
//   .then(() => {
//     console.log("App connected to database");
//     app.listen(8001, () => {
//       console.log(`App is listening to port: ${8001}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
