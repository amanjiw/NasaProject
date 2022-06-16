const fs = require("fs");
const path = require("path");

const planets = require("./planets.mongo");

const { parse } = require("csv-parse");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
const loadPlanetsData = () => {
  return new Promise((resolve, rejects) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          // habitablePlanets.push(data);
          savePlanets(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        rejects();
      })
      .on("end", async () => {
        const CountPlanetsFound = (await getAllPlanets()).length;

        console.log(`${CountPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
};

const getAllPlanets = async () => {
  return await planets.find({}, { _id: 0, __v: 0 });
};

const savePlanets = async (planet) => {
  try {
    await planets.updateOne(
      { keplerName: planet.kepler_name },
      { keplerName: planet.kepler_name },
      { upsert: true }
    );
  } catch (err) {
    console.log(`Could not save planer : ${err}`);
  }
};

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
