const {
  existsLaunchWithId,
  abortLaunchById,
  getAllLunches,
  scheduleNewLunch,
} = require("../../models/lunches.model");

const { getPagination } = require("../../services/query");

const httpGetAllLunches = async (req, res) => {
  const { skip, limit } = getPagination(req.query);

  return res.status(200).json(await getAllLunches(skip, limit));
};

const httpAddNewLunch = async (req, res) => {
  try {
    const lunch = req.body;
    console.log(lunch);

    if (!lunch.mission || !lunch.launchDate || !lunch.rocket || !lunch.target) {
      console.log("Erro : ===> Missing required lunch property");
      return res.status(400).json({ error: "Missing required lunch property" });
    }

    lunch.launchDate = new Date(lunch.launchDate);

    if (isNaN(lunch.launchDate)) {
      console.log("Error==> : Invalid Lunch Date");
      return res.status(400).json({ error: "Invalid Lunch Date" });
    }

    await scheduleNewLunch(lunch);

    res.status(201).json(lunch);
  } catch (err) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

const httpAbortLaunch = async (req, res) => {
  const launchId = Number(req.params.id);

  const existsLunch = await existsLaunchWithId(launchId);

  if (!existsLunch) {
    return res.status(404).json({ error: "Launch Not Found" });
  }

  const aborted = await abortLaunchById(launchId);

  if (!aborted) return res.status(400).json({ error: "Launch Not Aborted :(" });

  res.status(200).json({ ok: true });
};

module.exports = {
  httpGetAllLunches,
  httpAddNewLunch,
  httpAbortLaunch,
};
