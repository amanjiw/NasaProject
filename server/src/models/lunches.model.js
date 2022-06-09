const lunches = new Map();
let latestFlightNumber = 100;

const lunch = {
  flightNumber: 100,
  misson: "kepler Exploration X",
  rocket: "Explorer IS1",
  lunchDate: new Date("December 27, 2030"),
  destination: "kepler-422 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

lunches.set(lunch.flightNumber, lunch);

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

module.exports = {
  getAllLunches,
  addNewLunch,
};
