const lunchesData = require("./lunches.mongo");
const planets = require("./planets.mongo");

const axios = require("axios");

const X_API_URL = "https://api.spacexdata.com/v4/launches/query";

const lunches = new Map();
let DEFAULT_FLIGHT_NUMBER = 1;

const lunch = {
  flightNumber: DEFAULT_FLIGHT_NUMBER, //flight_number
  mission: "kepler Exploration X", //name
  rocket: "Explorer IS1", // rocket.name
  launchDate: new Date("september 27, 2030"), //date_local
  target: "Kepler-1410 b", // not applicable
  customers: ["ZTM", "NASA"],
  upcoming: true, //upcoming
  success: true, //success
};

const saveLunches = async (lunch) => {
  const planet = await planets.findOne({ keplerName: lunch.target });

  if (!planet) throw new Error("Not matching planet found");

  try {
    await lunchesData.updateOne({ flightNumber: lunch.flightNumber }, lunch, {
      upsert: true,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const getLatestFlightNumber = async () => {
  const latestLunch = await lunchesData.findOne().sort("-flightNumber");

  if (!latestLunch) return DEFAULT_FLIGHT_NUMBER;

  return latestLunch.flightNumber;
};

const scheduleNewLunch = async (lunch) => {
  try {
    const newFlightNumber = (await getLatestFlightNumber()) + 1;

    const newLunch = Object.assign(lunch, {
      // success: true,
      upcoming: true,
      customers: ["Ghaderi.co", "NASSA"],
      flightNumber: newFlightNumber,
    });

    await saveLunches(newLunch);
  } catch (err) {
    console.log("THIS IS YOUR ERROR : " + err);
    throw new Error(err);
  }
};

saveLunches(lunch);
// lunches.set(lunch.flightNumber, lunch);

const existsLaunchWithId = async (id) => {
  return await lunchesData.findOne({ flightNumber: id });
};

const getAllLunches = async () => {
  return await lunchesData.find({}, { _id: 0, __v: 0 });
};

const abortLaunchById = async (id) => {
  const aborted = await lunchesData.updateOne(
    { flightNumber: id },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.ok === 1 && aborted.nModified === 1;
};

const loadLaunchesData = async () => {
  const response = await axios.post(X_API_URL, {
    query: {},
    options: {
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
};

module.exports = {
  existsLaunchWithId,
  abortLaunchById,
  getAllLunches,
  scheduleNewLunch,
  loadLaunchesData,
};
