import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const {
    firstName,
    lastName,
    birthday,
    gender,
    email,
    phoneNumber,
    password,
    confirmPassword,
  } = req.body;

  if (password !== confirmPassword) {
    return next(errorHandler(400, "Passwords do not match"));
  }

  const isValidUser = await User.findOne({ email });

  if (isValidUser) {
    return next(errorHandler(400, "User already exists"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    birthday,
    gender,
    email,
    phoneNumber,
    password: hashedPassword,
    confirmPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User Created successfully...",
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found..."));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials..."));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("Access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Login Successful...",
      rest,
    });
  } catch (error) {
    next(error);
  }
};
