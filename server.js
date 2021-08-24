const server = require("express")();
server.use(require("body-parser").json());
server.use(require("cors")());
const sequelize = require("sequelize");

const { db, Event, User, Restaurant, Music } = require("./models/db");
const Op = require("sequelize").Op;

let port = process.env.PORT;
if (!port) {
  port = 3001;
}

server.get("/events", async (req, res) => {
  res.send({
    events: await Event.findAll({
      order: [sequelize.literal(`date >= CURRENT_DATE DESC, date`)],
    }),
  });
});

server.get("/livemusic", async (req, res) => {
  res.send({
    music: await Music.findAll({
      order: [sequelize.literal(`date >= CURRENT_DATE DESC, date`)],
    }),
  });
});

server.get("/events/:id", async (req, res) => {
  res.send({
    events: await Event.findOne({
      where: { eventID: req.params.id },
    }),
  });
});

server.get(`/restaurants`, async (req, res) => {
  res.send({ restaurants: await Restaurant.findAll() });
});

// server.post(`/login`, async (req, res) => {
//   const user = await User.findOne({ where: { email: req.headers.email } });

//   if (!user) {
//     res.send({ error: "Email address is not in our system." });
//   } else {
//     if (user.password === req.headers.password) {
//       res.send({ success: true });
//     } else {
//       res.send({ error: "Password does not match." });
//     }
//   }
// });

// server.post(`/signup`, async (req, res) => {
//   const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//   if (req.headers.password.length < 8) {
//     res.send({ error: "Password is too short." });
//   } else if (!specialCharacters.test(req.headers.password)) {
//     res.send({
//       error: "Password must contain at least one special character.",
//     });
//   } else {
//     await User.create(req.headers);
//     res.send({ success: true });
//   }
// });

server.post("/search", async (req, res) => {
  res.send({
    events: await Event.findAll({
      where: {
        [Op.or]: {
          title: { [Op.iLike]: `%${req.body.searchQuery}%` },
          description: { [Op.iLike]: `%${req.body.searchQuery}%` },
          date: { [Op.iLike]: `%${req.body.searchQuery}%` },
        },
      },
    }),
  });
});

server.get("/", (req, res) => {
  res.send({ hello: "world" });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
