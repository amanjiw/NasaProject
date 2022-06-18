const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://amanji:amanj8917@cluster0.iz5yo.mongodb.net/?retryWrites=true&w=majority";

const MONGO_URL_2 = "mongodb://envy:27017/nasa";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is Ready :)");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL_2);
};

const mongoDisConnent = async () => {
  await mongoose.disconnect();
};

module.exports = {
  mongoConnect,
  mongoDisConnent,
};
