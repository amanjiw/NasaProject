const express = require("express");

const { httpGetAllLunches, httpAddNewLunch } = require("./lunches.controller");

const lunchesRouter = express.Router();

lunchesRouter.get("/", httpGetAllLunches);
lunchesRouter.post("/", httpAddNewLunch);

module.exports = lunchesRouter;
