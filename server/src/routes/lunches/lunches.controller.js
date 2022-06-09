const { getAllLunches, addNewLunch } = require("../../models/lunches.model");

const httpGetAllLunches = (req, res) => {
  return res.status(200).json(getAllLunches());
};

const httpAddNewLunch = (req, res) => {
  const lunch = req.body;
  lunch.lunchDate = new Date(lunch.lunchDate);
  addNewLunch(lunch);

  res.status(201).json(lunch);
};

module.exports = {
  httpGetAllLunches,
  httpAddNewLunch,
};
