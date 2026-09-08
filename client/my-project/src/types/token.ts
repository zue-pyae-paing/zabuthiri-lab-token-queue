export type TokenStatus =
  | "waiting"
  | "serving"
  | "completed";

export interface Patient {
  _id: string;
  token: string;
  patientName: string;
  age: number;
  status: TokenStatus;
  calledAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QueueSnapshot {
  queue: Patient[];
  currentPatient: Patient | null;
}

/**
 * Public TV patient
 *
 * Do not add patientName here.
 */
export interface DisplayPatient {
  id: string;
  token: string;
  age: number;
}

export interface DisplayQueueSnapshot {
  queue: DisplayPatient[];
  currentPatient: DisplayPatient | null;
}