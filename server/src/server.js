require("dotenv").config();

const http = require("http");

const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");
const setupTokenSocket = require("./socket/token.socket");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // MongoDB
    await connectDB();

    // HTTP Server
    const server = http.createServer(app);

    // Socket.IO
    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
      },
    });

    // Make io available inside controllers
    app.set("io", io);

    // Socket setup
    setupTokenSocket(io);

    // Start server
    server.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );

      console.log(
        `Socket.IO running on ws://localhost:${PORT}`
      );
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