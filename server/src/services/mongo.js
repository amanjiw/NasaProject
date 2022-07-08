const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;
const MONGO_URL_2 = process.env.MONGO_URL_2;

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
