const server = require("express")();
server.use(require("body-parser").json());
server.use(require("cors")());
const scraper = require("./scraper");

const { db, Event, User, Restaurant } = require("./models/db");

server.get("/events", async (req, res) => {
  // const fnw = await scraper.fnw.allEvents();
  const everson = await scraper.everson.allEvents();
  // res.send({ events: await Event.findAll() });
  res.send(everson);
});

// http://localhost:3001/eventlistings/picnic2021
// server.get("/eventlistings/:event", (req, res) => {
//   scraper.everson.getEvent(req.params.event).then((events) => {
//     res.send(events);
//   });
// });

server.get(`/restaurants`, async (req, res) => {
  res.send({ restaurants: await Restaurant.findAll() });
});

server.post(`/login`, async (req, res) => {
  const user = await User.findOne({ where: { email: req.headers.email } });

  if (!user) {
    res.send({ error: "Email address is not in our system." });
  } else {
    if (user.password === req.headers.password) {
      res.send({ success: true });
    } else {
      res.send({ error: "Password does not match." });
    }
  }
});

server.post(`/signup`, async (req, res) => {
  const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (req.headers.password.length < 8) {
    res.send({ error: "Password is too short." });
  } else if (!specialCharacters.test(req.headers.password)) {
    res.send({
      error: "Password must contain at least one special character.",
    });
  } else {
    await User.create(req.headers);
    res.send({ success: true });
  }
});

server.get("/", (req, res) => {
  res.send({ hello: "world" });
});

server.listen(3001, () => {
  console.log("Listening on port 3001.");
});
