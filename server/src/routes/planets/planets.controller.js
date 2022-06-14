const planets = require("../../models/planets.model");

const getAllPlanets = async (req, res) => {
  return res.status(200).json(await planets.getAllPlanets());
};

module.exports = {
  getAllPlanets,
};
