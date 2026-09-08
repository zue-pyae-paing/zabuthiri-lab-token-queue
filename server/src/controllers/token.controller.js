const tokenService = require("../services/token.service.js");

const {
  emitQueueUpdated,
  emitDisplayUpdated,
  emitRecall,
} = require("../socket/token.events.js");

/*
|--------------------------------------------------------------------------
| Register Token
|--------------------------------------------------------------------------
*/
const registerToken = async (req, res, next) => {
  try {
    const { patientName, age } = req.body;

    const patient = await tokenService.createToken(
      patientName,
      age,
    );

    const io = req.app.get("io");

    await emitQueueUpdated(io);
    await emitDisplayUpdated(io);

    res.status(201).json({
      success: true,
      message: "Patient registered successfully.",
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Waiting Queue
|--------------------------------------------------------------------------
*/
const getQueue = async (req, res, next) => {
  try {
    const queue = await tokenService.getWaitingQueue();

    res.status(200).json({
      success: true,
      message: "Queue fetched successfully.",
      data: queue,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Current Patient
|--------------------------------------------------------------------------
*/
const getCurrent = async (req, res, next) => {
  try {
    const patient =
      await tokenService.getCurrentPatient();

    res.status(200).json({
      success: true,
      message: "Current patient fetched successfully.",
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Public Display
|--------------------------------------------------------------------------
| No authentication required.
*/
const getDisplay = async (req, res, next) => {
  try {
    const snapshot =
      await tokenService.getDisplaySnapshot();

    res.status(200).json({
      success: true,
      message: "Display snapshot fetched successfully.",
      data: snapshot,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Call Next Patient
|--------------------------------------------------------------------------
*/
const callNext = async (req, res, next) => {
  try {
    const patient =
      await tokenService.callNextPatient();

    const io = req.app.get("io");

    await emitQueueUpdated(io);
    await emitDisplayUpdated(io);

    res.status(200).json({
      success: true,
      message: "Next patient called successfully.",
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Recall Current Patient
|--------------------------------------------------------------------------
*/
const recall = async (req, res, next) => {
  try {
    const patient =
      await tokenService.recallPatient();

    const io = req.app.get("io");

    await emitRecall(io, patient);

    res.status(200).json({
      success: true,
      message: "Patient recalled successfully.",
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Complete Current Patient
|--------------------------------------------------------------------------
*/
const complete = async (req, res, next) => {
  try {
    const patient =
      await tokenService.completePatient();

    const io = req.app.get("io");

    await emitQueueUpdated(io);
    await emitDisplayUpdated(io);

    res.status(200).json({
      success: true,
      message: "Patient completed successfully.",
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/
module.exports = {
  registerToken,
  getQueue,
  getCurrent,
  getDisplay,
  callNext,
  recall,
  complete,
};