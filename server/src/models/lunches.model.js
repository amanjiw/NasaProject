const launches = require("./lunches.mongo");

const lunches = new Map();
let latestFlightNumber = 100;

const lunch = {
  flightNumber: 100,
  mission: "kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("september 27, 2030"),
  target: "kepler-422 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

lunches.set(lunch.flightNumber, lunch);

const existsLaunchWithId = (id) => {
  return lunches.has(id);
};

const getAllLunches = () => {
  return Array.from(lunches.values());
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
