import User from "../models/user.models.js"; 
import errorHandler from "../utils/errorHandler.js"; 

export const signUp = async (req, res, next) => {
  const { name, email, age, password } = req.body;

  const newUser = new User({
    name,
    email,
    age,
    password, 
    role: "user", 
  });

  try {
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    next(errorHandler(err.status || 500, err.message || "Internal Server Error"));
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    if (validUser.password !== password) {
      return next(errorHandler(401, "Wrong password"));
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: validUser, 
    });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};
