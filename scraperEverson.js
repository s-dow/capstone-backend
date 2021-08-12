const fetch = require("node-fetch");
const cheerio = require("cheerio");
const cron = require("node-cron");

const { db } = require("./models/db");
const allEventsUrl = "https://everson.org/events-list/events-category-events/";
const oneEventUrl = "https://everson.org/connect/";

cron.schedule("*/5 * * * *", async () => {
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
      title: title.text(),
      date: date.text().replace(/\n/g, ""),
      description: description.text(),
    };
    events.push(event);
  });
  events.map((event) => {
    db.query(`INSERT INTO events
        (title, date, description)
        VALUES ('${event.title}', '${event.date}', '${event.description}') ON CONFLICT (title) DO NOTHING`);
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
