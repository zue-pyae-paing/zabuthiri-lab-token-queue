const express = require("express");

const {
  login,
  createUser,
  getMe,
} = require("../controllers/auth.controller");

const {
  authenticate,
  authorize,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", login);

router.get(
  "/me",
  authenticate,
  getMe
);

router.post(
  "/users",
  authenticate,
  authorize("admin"),
  createUser
);

module.exports = router;