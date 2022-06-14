const mongoose = require("mongoose");

const lunchesSchema = new mongoose.Schema({
  flightNumber: { type: Number, required: true },
  launchesDate: { type: Date, required: true },
  mission: { type: String, required: true },
  customers: [String],
  target: { type: String, required: true },
  upcoming: { type: Boolean, required: true },
  success: { type: Boolean, required: true },
});

module.exports = mongoose.model("Launche", lunchesSchema);
