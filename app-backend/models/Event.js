const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("event", {
    eventID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DT.STRING,
    date: DT.STRING,
    description: DT.STRING,
    time: DT.TIME,
    link: DT.STRING,
    address1: DT.STRING,
    address2: DT.STRING,
    city: DT.STRING,
    state: DT.STRING,
    zipCode: DT.STRING,
  });
};
