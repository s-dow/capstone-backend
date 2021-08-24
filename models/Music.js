const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define(
    "music",
    {
      musicID: {
        type: DT.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DT.STRING,
        unique: true,
      },
      date: DT.DATE,
      time: DT.STRING,
      link: DT.STRING,
      location: DT.STRING,
      tag: DT.STRING,
    },
    {
      timestamps: false,
    }
  );
};
