// const fetch = require("node-fetch");
// const cheerio = require("cheerio");
// const cron = require("node-cron");

// const { db } = require("./models/db");
// const allEventsUrl =
//   "https://www.facebook.com/events/551984769176431/?acontext=%7B%22ref%22%3A%2252%22%2C%22action_history%22%3A%22[%7B%5C%22surface%5C%22%3A%5C%22share_link%5C%22%2C%5C%22mechanism%5C%22%3A%5C%22share_link%5C%22%2C%5C%22extra_data%5C%22%3A%7B%5C%22invite_link_id%5C%22%3A535455291036800%7D%7D]%22%7D";
// const oneEventUrl = "https://everson.org/connect/";

// cron.schedule("*/1 * * * *", async () => {
//   const response = await fetch(`${allEventsUrl}`);
//   const body = await response.text();
//   const $ = cheerio.load(body);

//   const events = [];

//   $(`.post_text_inner`).each((index, ele) => {
//     const element = $(ele);
//     const title = element.find(".entry_title");
//     const date = element.find(".archivedate");
//     const description = element.find(".post_excerpt");
//     const event = {
//       title: title.text(),
//       date: date.text().replace(/\n/g, ""),
//       description: description.text(),
//     };
//     events.push(event);
//   });
//   events.map((event) => {
//     db.query(`INSERT INTO events
//         (title, date, description)
//         VALUES ('${event.title}', '${event.date}', '${event.description}') ON CONFLICT (title) DO NOTHING`);
//   });
// });

// // const getEvent = (eventID) => {
// //   return fetch(`${oneEventUrl}${eventID}`)
// //     .then((res) => res.text())
// //     .then((body) => {
// //       const $ = cheerio.load(body);
// //       const eventDetails = [];

// //       $(`.post_text`).each((index, ele) => {
// //         const element = $(ele);
// //         const title = element.find(".blogtitle");
// //         const date = element.find(".wpb_wrapper h4");
// //         const description = element.find(".wpb_wrapper p");
// //         const eventDetail = {
// //           title: title.text(),
// //           date: date.text().replace(/\n/g, ""),
// //           description: description.text().replace(/\n/g, ""),
// //         };
// //         eventDetails.push(eventDetail);
// //       });
// //       console.log(eventDetails);
// //       return eventDetails;
// //     });
// // };

// // module.exports = {
// //   // allEvents,
// //   getEvent,
// // };
