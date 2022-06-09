const express = require("express");

const { getAllPlanets } = require("./planets.controller");

const planetRouter = express.Router();

planetRouter.get("/", getAllPlanets);

module.exports = planetRouter;
