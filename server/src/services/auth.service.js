const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const login = async (username, password) => {
  const user = await User.findOne({
    username: username.toLowerCase(),
  }).select("+password");

  if (!user) {
    throw new Error("Invalid username or password.");
  }

  if (!user.isActive) {
    throw new Error("This account is inactive.");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid username or password.");
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5d",
    }
  );

  return {
    token,

    user: {
      id: user._id,
      username: user.username,
      role: user.role,
    },
  };
};

const createUser = async ({
  username,
  password,
  role = "staff",
}) => {
  const existingUser = await User.findOne({
    username: username.toLowerCase(),
  });

  if (existingUser) {
    throw new Error("Username already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    username: username.toLowerCase(),
    password: hashedPassword,
    role,
  });

  return {
    id: user._id,
    username: user.username,
    role: user.role,
  };
};

module.exports = {
  login,
  createUser,
};