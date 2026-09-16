const Token = require("../models/token.model.js");
const Counter = require("../models/counter.model.js");

/**
 * Generate next laboratory token
 *
 * LAB-001
 * LAB-002
 * LAB-003
 */
const generateToken = async () => {
  const counter = await Counter.findOneAndUpdate(
    {
      key: "LAB",
    },
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  return `LAB-${String(counter.sequence).padStart(3, "0")}`;
};

/**
 * Register new patient
 */
const createToken = async (patientName, age) => {
  const token = await generateToken();

  const patient = await Token.create({
    token,
    patientName,
    age,
    status: "waiting",
  });

  return patient;
};

/**
 * Get waiting queue
 */
const getWaitingQueue = async () => {
  return Token.find({
    status: "waiting",
  })
    .sort({
      createdAt: 1,
    })
    .lean();
};

/**
 * Get currently serving patient
 */
const getCurrentPatient = async () => {
  return Token.findOne({
    status: "serving",
  })
    .sort({
      calledAt: -1,
    })
    .lean();
};

/**
 * Get staff snapshot
 *
 * Staff can receive full patient information.
 */
const getStaffSnapshot = async () => {
  const [queue, currentPatient] = await Promise.all([
    getWaitingQueue(),
    getCurrentPatient(),
  ]);

  return {
    queue,
    currentPatient,
  };
};

/**
 * Convert patient to public display data
 *
 * IMPORTANT:
 * Never send patient name or other private information
 * to the public TV.
 */
const toDisplayPatient = (patient) => {
  if (!patient) {
    return null;
  }

  return {
    id: patient._id,
    token: patient.token,
    age: patient.age,
    patientName: patient.patientName, // Include patientName in the display data
  };
};

/**
 * Public TV snapshot
 *
 * Only send information required by the TV.
 */
const getDisplaySnapshot = async () => {
  const [queue, currentPatient] = await Promise.all([
    getWaitingQueue(),
    getCurrentPatient(),
  ]);

  return {
    queue: queue.map(toDisplayPatient),
    currentPatient: toDisplayPatient(currentPatient),
  };
};

/**
 * Call next patient
 */
const callNextPatient = async () => {
  const currentPatient = await getCurrentPatient();

  if (currentPatient) {
    throw new Error(
      "Please complete the current patient before calling next.",
    );
  }

  const patient = await Token.findOneAndUpdate(
    {
      status: "waiting",
    },
    {
      $set: {
        status: "serving",
        calledAt: new Date(),
      },
    },
    {
      sort: {
        createdAt: 1,
      },
      new: true,
    },
  ).lean();

  if (!patient) {
    throw new Error("No waiting patients.");
  }

  return patient;
};

/**
 * Complete current patient
 */
const completePatient = async () => {
  const patient = await Token.findOneAndUpdate(
    {
      status: "serving",
    },
    {
      $set: {
        status: "completed",
        completedAt: new Date(),
      },
    },
    {
      new: true,
    },
  ).lean();

  if (!patient) {
    throw new Error("No patient is currently serving.");
  }

  return patient;
};

/**
 * Recall current patient
 *
 * No database status change.
 */
const recallPatient = async () => {
  const patient = await getCurrentPatient();

  if (!patient) {
    throw new Error("No patient is currently serving.");
  }

  return patient;
};

module.exports = {
  createToken,
  getWaitingQueue,
  getCurrentPatient,
  getStaffSnapshot,
  getDisplaySnapshot,
  toDisplayPatient,
  callNextPatient,
  completePatient,
  recallPatient,
};