const Sequelize = require("sequelize");

const db = new Sequelize(`postgres://hackupstate@localhost:5432/events`, {
  logging: false,
});

const Event = require("./Event")(db);
const User = require("./User")(db);
const Restaurant = require("./Restaurant")(db);

const connectToDB = async () => {
  await db.authenticate();
  console.log("DB connected.");

  db.sync();
};

connectToDB();
module.exports = { db, Event, User, Restaurant };
