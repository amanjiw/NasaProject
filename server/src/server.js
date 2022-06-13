const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const MONGO_URL =
  "mongodb+srv://amanji:amanj8917@cluster0.iz5yo.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is Ready :)");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

const startServer = async () => {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
};

startServer();
