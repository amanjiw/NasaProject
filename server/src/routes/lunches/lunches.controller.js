const { lunches } = require("../../models/lunches.model");

const getAllLunches = (req, res) => {
  return res.status(200).json(Array.from(lunches.values()));
};

module.exports = {
  getAllLunches,
};
