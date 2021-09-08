const fetch = require("node-fetch");
const cheerio = require("cheerio");
const cron = require("node-cron");
const chrono = require("chrono-node");
const dateFormat = require("dateformat");

const { db } = require("./models/db");
const allEventsUrl = "https://www.mccarthymercantile.com/events-we-present";
const oneEventUrl = "https://everson.org/connect/";

cron.schedule("* * */1 * *", async () => {
  const response = await fetch(`${allEventsUrl}`);
  const body = await response.text();
  const $ = cheerio.load(body);

  const events = [];

  $(`.eventlist-column-info`).each((index, ele) => {
    const element = $(ele);
    const title = element.find(".eventlist-title");
    const date = element.find(".event-date");
    // const time = element.find(".event-time-localized");
    const description = element.find(".eventlist-excerpt").replace(`'`, `''`);
    const event = {
      title: title.text(),
      date: dateFormat(
        chrono.parseDate(date.text().replace(/\n/g, " ")),
        "isoDateTime"
      ),
      tag: "mccarthy",
      business: "McCarthy Mercantile",
      description: description.text(),
    };

    events.push(event);
  });

  events.map((event) => {
    db.query(`INSERT INTO events
        (tag, business, title, date, description)
        VALUES ('${event.tag}', '${event.business}', '${event.title}', '${event.date}', '${event.description}') ON CONFLICT (title) DO NOTHING`);
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
