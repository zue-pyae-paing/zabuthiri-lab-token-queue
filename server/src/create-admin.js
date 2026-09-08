require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/user.model");

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      username: "admin",
    });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      process.exit(0);
    }

    const password = await bcrypt.hash(
      "admin102030",
      12
    );

    await User.create({
      username: "admin",
      password,
      role: "admin",
      isActive: true,
    });

    console.log("Admin user created successfully.");
    console.log("Username: admin");
    console.log("Password: admin123456");

    process.exit(0);
  } catch (error) {
    console.error(
      "Failed to create admin:",
      error.message
    );

    process.exit(1);
  }
};

createAdmin();