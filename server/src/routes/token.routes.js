const express = require("express");

const tokenController = require("../controllers/token.controller.js");
const { authenticate } = require("../middleware/auth.middleware.js");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Display
|--------------------------------------------------------------------------
| TV does not require authentication.
*/
router.get(
  "/display",
  tokenController.getDisplay,
);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/
router.use(authenticate);

router.post(
  "/",
  tokenController.registerToken,
);

router.get(
  "/queue",
  tokenController.getQueue,
);

router.get(
  "/current",
  tokenController.getCurrent,
);

router.post(
  "/next",
  tokenController.callNext,
);

router.post(
  "/recall",
  tokenController.recall,
);

router.post(
  "/complete",
  tokenController.complete,
);

module.exports = router;