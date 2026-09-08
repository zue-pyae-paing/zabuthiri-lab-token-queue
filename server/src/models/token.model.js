const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    patientName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },

    status: {
      type: String,
      enum: ["waiting", "serving", "completed"],
      default: "waiting",
      index: true,
    },

    calledAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

tokenSchema.index({
  status: 1,
  createdAt: 1,
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;