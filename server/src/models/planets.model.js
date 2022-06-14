const fs = require("fs");
const path = require("path");

const planets = require("./planets.mongo");

const { parse } = require("csv-parse");

const habitablePlanets = [];

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
          planets.create({ keplerName: data.kepler_name });
          // habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        rejects();
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
};

const getAllPlanets = async () => {
  return await planets.find({});
};

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
