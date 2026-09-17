require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const bcrypt = require("bcryptjs");

const app = require("./app");
const connectDB = require("./config/db");
const User = require("./models/user.model");
const setupTokenSocket = require("./socket/token.socket");

const PORT = process.env.PORT || 5000;

const createDefaultAdmin = async () => {
  const existingAdmin = await User.findOne({
    username: "admin",
  });

  if (existingAdmin) {
    console.log("Admin user already exists.");
    return;
  }

  const password = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    12
  );

  await User.create({
    username: "admin",
    password,
    role: "admin",
    isActive: true,
  });

  console.log("Default admin created successfully.");
};

const startServer = async () => {
  try {
    await connectDB();

    await createDefaultAdmin();

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
      },
    });

    app.set("io", io);

    setupTokenSocket(io);

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Socket.IO is ready");
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();