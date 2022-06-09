const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const planetRouter = require("./routes/planets/planets.router");
const lunchesRouter = require("./routes/lunches/lunches.router");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("combined"));
app.use(express.json());
app.use("/planets", planetRouter);
app.use("/lunches", lunchesRouter);
module.exports = app;
