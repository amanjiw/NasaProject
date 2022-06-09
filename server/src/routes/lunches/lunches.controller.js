const { getAllLunches, addNewLunch } = require("../../models/lunches.model");

const httpGetAllLunches = (req, res) => {
  return res.status(200).json(getAllLunches());
};

const httpAddNewLunch = (req, res) => {
  const lunch = req.body;

  if (!lunch.mission || !lunch.launchDate || !lunch.rocket || !lunch.target) {
    console.log("Erro : ===> Missing required lunch property");
    return res.status(400).json({ error: "Missing required lunch property" });
  }

  lunch.launchDate = new Date(lunch.launchDate);

  if (isNaN(lunch.launchDate)) {
    console.log("Error==> : Invalid Lunch Date");
    return res.status(400).json({ error: "Invalid Lunch Date" });
  }

  addNewLunch(lunch);

  res.status(201).json(lunch);
};

module.exports = {
  httpGetAllLunches,
  httpAddNewLunch,
};
