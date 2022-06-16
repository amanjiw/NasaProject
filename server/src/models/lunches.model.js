const lunchesData = require("./lunches.mongo");
const planets = require("./planets.mongo");

const lunches = new Map();
let latestFlightNumber = 100;

const lunch = {
  flightNumber: 100,
  mission: "kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("september 27, 2030"),
  target: "kepler-422 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

const saveLunches = async (lunch) => {
  const planet = planets.findOne({ keplerName: lunch.target });

  if (!planet) throw new Error("Not matching planet found");

  try {
    await lunchesData.updateOne({ flightNumber: lunch.flightNumber }, lunch, {
      upsert: true,
    });
  } catch (err) {
    console.log(err);
  }
};

saveLunches(lunch);
// lunches.set(lunch.flightNumber, lunch);

const existsLaunchWithId = (id) => {
  return lunches.has(id);
};

const getAllLunches = async () => {
  return await lunchesData.find({}, { _id: 0, __v: 0 });
};

const addNewLunch = (lunch) => {
  latestFlightNumber++;

  lunches.set(
    latestFlightNumber,
    Object.assign(lunch, {
      flightNumber: latestFlightNumber,
      customer: ["AMANJ", "NASA"],
      upcoming: true,
      success: true,
    })
  );
};

const abortLaunchById = (id) => {
  const aborted = lunches.get(id);

  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
};

module.exports = {
  existsLaunchWithId,
  abortLaunchById,
  getAllLunches,
  addNewLunch,
};
