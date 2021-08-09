const fetch = require("node-fetch");
const cheerio = require("cheerio");

const { db } = require("./models/db");
const allEventsUrl = "https://everson.org/events-list/events-category-events/";
const oneEventUrl = "https://everson.org/connect/";

const allEvents = async () => {
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
  return events;
  // events.map((event) => {
  //   db.query(`INSERT INTO events
  //       (title, date, description)
  //       VALUES ('${event.title}', '${event.date}', '${event.description}')`);
  // });
};

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
//       return eventDetails;
//     });
// };

module.exports = {
  allEvents,
  // getEvent,
};
