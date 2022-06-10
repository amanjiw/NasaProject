const {
  existsLaunchWithId,
  abortLaunchById,
  getAllLunches,
  addNewLunch,
} = require("../../models/lunches.model");

const httpGetAllLunches = (req, res) => {
  return res.status(200).json(getAllLunches());
};

const httpAddNewLunch = (req, res) => {
  const lunch = req.body;
  console.log(lunch)

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

const httpAbortLaunch = (req, res) => {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({ error: "Launch Not Found" });
  }

  const aborted = abortLaunchById(launchId);
 
  res.status(200).json(aborted);
};

module.exports = {
  httpGetAllLunches,
  httpAddNewLunch,
  httpAbortLaunch,
};
