const lunches = new Map();

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

module.exports = {
  lunches,
};
