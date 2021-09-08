const fetch = require("node-fetch");
const cheerio = require("cheerio");
const cron = require("node-cron");
const chrono = require("chrono-node");
const dateFormat = require("dateformat");

const { db } = require("./models/db");
const allEventsUrl = "https://everson.org/events-list/events-category-events/";
const oneEventUrl = "https://everson.org/connect/";

cron.schedule("* * */1 * *", async () => {
  const response = await fetch(`${allEventsUrl}`);
  const body = await response.text();
  const $ = cheerio.load(body);

  const events = [];

  $(`.post_text_inner`).each((index, ele) => {
    const element = $(ele);
    const title = element.find(".entry_title");
    const date = element.find(".archivedate");
    const description = element.find(".post_excerpt");
    const event = {
      business: "Everson Museum of Art",
      address1: "401 Harrison Street",
      city: "Syracuse",
      state: "NY",
      tag: "museum",
      title: title.text(),
      date: dateFormat(
        chrono.parseDate(date.text().replace(/\n/g, " ")),
        "isoDateTime"
      ),
      description: description.text(),
    };
    events.push(event);
  });

  events.map((event) => {
    db.query(`INSERT INTO events
        (title, business, tag, address1, city, state, date, description)
        VALUES ('${event.title}', '${event.business}','${event.tag}','${event.address1}', '${event.city}', '${event.state}', '${event.date}', '${event.description}') ON CONFLICT (title) DO NOTHING`);
  });
});

// const getEvent = (eventID) => {
//   return fetch(`${oneEventUrl}${eventID}`)
//     .then((res) => res.text())
//     .then((body) => {
//       const $ = cheerio.load(body);
//       const eventDetails = [];

//       $(`.post_text`).each((index, ele) => {
//         const element = $(ele);
//         const title = element.find(".blogtitle");
//         const date = element.find(".wpb_wrapper h4");
//         const description = element.find(".wpb_wrapper p");
//         const eventDetail = {
//           title: title.text(),
//           date: date.text().replace(/\n/g, ""),
//           description: description.text().replace(/\n/g, ""),
//         };
//         eventDetails.push(eventDetail);
//       });
//       console.log(eventDetails);
//       return eventDetails;
//     });
// };

// module.exports = {
//   // allEvents,
//   getEvent,
// };
