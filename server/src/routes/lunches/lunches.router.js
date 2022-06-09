const express = require("express");

const { getAllLunches } = require("./lunches.controller");

const lunchesRouter = express.Router();

lunchesRouter.get("/lunches", getAllLunches);

module.exports = lunchesRouter;
