const Sequelize = require("sequelize");

let db;

let dbURL = process.env.DATABASE_URL;
if (!dbURL) {
  db = new Sequelize("postgres://hackupstate@localhost:5432/events", {
    logging: false,
    dialect: "postgres",
    protocol: "postgres",
  });
} else {
  db = new Sequelize(dbURL, {
    logging: false,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

//

// const db = new Sequelize(`postgres://hackupstate@localhost:5432/events`, {
//   logging: false,
// });

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
