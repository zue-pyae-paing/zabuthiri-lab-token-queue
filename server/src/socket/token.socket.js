const jwt = require("jsonwebtoken");

const {
  getStaffSnapshot,
  getDisplaySnapshot,
} = require("../services/token.service");

const setupTokenSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    /*
    |--------------------------------------------------------------------------
    | Public TV
    |--------------------------------------------------------------------------
    */

    if (!token) {
      socket.data.clientType = "display";

      return next();
    }

    /*
    |--------------------------------------------------------------------------
    | Staff / Admin
    |--------------------------------------------------------------------------
    */

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      socket.data.user = decoded;
      socket.data.clientType = "staff";

      next();
    } catch (error) {
      next(
        new Error("Invalid or expired authentication token.")
      );
    }
  });

  io.on("connection", async (socket) => {
    console.log(
      `Socket connected: ${socket.id} (${socket.data.clientType})`
    );

    /*
    |--------------------------------------------------------------------------
    | Staff
    |--------------------------------------------------------------------------
    */

    if (socket.data.clientType === "staff") {
      socket.join("staff");

      try {
        const snapshot = await getStaffSnapshot();

        socket.emit(
          "staff:queue-updated",
          snapshot
        );
      } catch (error) {
        console.error(
          "Failed to send staff snapshot:",
          error.message
        );
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Public Display
    |--------------------------------------------------------------------------
    */

    if (socket.data.clientType === "display") {
      socket.join("display");

      try {
        const snapshot = await getDisplaySnapshot();

        socket.emit(
          "display:updated",
          snapshot
        );
      } catch (error) {
        console.error(
          "Failed to send display snapshot:",
          error.message
        );
      }
    }

    socket.on("disconnect", (reason) => {
      console.log(
        `Socket disconnected: ${socket.id}`,
        reason
      );
    });
  });
};

module.exports = setupTokenSocket;