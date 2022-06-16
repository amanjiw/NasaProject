const express = require("express");

const {
  httpGetAllLunches,
  httpAddNewLunch,
  httpAbortLaunch,
} = require("./lunches.controller");

const lunchesRouter = express.Router();

lunchesRouter.get("/", httpGetAllLunches);
lunchesRouter.post("/",  httpAddNewLunch);
lunchesRouter.delete("/:id", httpAbortLaunch);

module.exports = lunchesRouter;
