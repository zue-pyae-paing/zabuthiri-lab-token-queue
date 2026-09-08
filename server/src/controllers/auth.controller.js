const { z } = require("zod");

const authService = require("../services/auth.service");

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(30),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3)
    .max(30),

  password: z
    .string()
    .min(6)
    .max(100),

  role: z
    .enum(["admin", "staff"])
    .default("staff"),
});

const login = async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const result = await authService.login(
      data.username,
      data.password
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: error.flatten().fieldErrors,
      });
    }

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const data = createUserSchema.parse(req.body);

    const user = await authService.createUser(data);

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: error.flatten().fieldErrors,
      });
    }

    return res.status(409).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      id: req.user.userId,
      username: req.user.username,
      role: req.user.role,
    },
  });
};

module.exports = {
  login,
  createUser,
  getMe,
};