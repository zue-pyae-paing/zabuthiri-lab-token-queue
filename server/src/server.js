require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");
const setupTokenSocket = require("./socket/token.socket");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect MongoDB
    await connectDB();

    // Create HTTP server
    const server = http.createServer(app);

    // Setup Socket.IO
    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
      },
    });

    // Make Socket.IO available inside controllers
    app.set("io", io);

    // Setup socket events
    setupTokenSocket(io);

    // Start server
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Socket.IO is ready");
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message,
    );

    process.exit(1);
  }
};

startServer();