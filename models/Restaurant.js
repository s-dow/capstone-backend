const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("restaurant", {
    restaurantID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DT.STRING,
    image: DT.TEXT,
    description: DT.STRING,
    hours: DT.STRING,
    link: DT.TEXT,
    phoneNumber: DT.STRING,
    address1: DT.STRING,
    address2: DT.STRING,
    city: DT.STRING,
    state: DT.STRING,
    zipCode: DT.STRING,
    outdoorDining: DT.BOOLEAN,
  });
};
