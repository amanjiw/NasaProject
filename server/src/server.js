const http = require("http");

const app = require("./app");

const { mongoConnect } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchesData } = require("../src/models/lunches.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  // await mongoConnect();
  // await loadPlanetsData();
  await loadLaunchesData();
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
};

startServer();
