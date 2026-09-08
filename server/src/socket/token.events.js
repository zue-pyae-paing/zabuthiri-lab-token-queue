const tokenService = require("../services/token.service.js");

/**
 * Emit updated queue to staff clients
 */
const emitQueueUpdated = async (io) => {
  const snapshot = await tokenService.getStaffSnapshot();

  io.to("staff").emit(
    "staff:queue-updated",
    snapshot,
  );
};

/**
 * Emit updated queue to public TV
 */
const emitDisplayUpdated = async (io) => {
  const snapshot = await tokenService.getDisplaySnapshot();

  io.to("display").emit(
    "display:updated",
    snapshot,
  );
};

/**
 * Emit recalled patient to public TV
 */
const emitRecall = async (io) => {
  const patient =
    await tokenService.recallPatient();

  const displayPatient =
    tokenService.toDisplayPatient(patient);

  io.to("display").emit(
    "display:recalled",
    displayPatient,
  );
};

module.exports = {
  emitQueueUpdated,
  emitDisplayUpdated,
  emitRecall,
};