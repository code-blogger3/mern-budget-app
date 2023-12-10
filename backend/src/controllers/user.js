import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json(new ApiError(400, "Username already exists"));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.json(new ApiResponse(200, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json(new ApiError(400, "Username or password is incorrect"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json(new ApiError(400, "Username or password is incorrect"));
    }

    const token = jwt.sign({ id: user._id }, "superSafe");
    res.json(
      new ApiResponse(200, "login detail is send", {
        token,
        userID: user._id,
      })
    );
  } catch (error) {
    res.status(500).json(new ApiError(500, "user not able to login", error));
  }
});

export { registerUser, loginUser };
