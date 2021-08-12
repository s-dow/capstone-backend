// const fetch = require("node-fetch");
// const cheerio = require("cheerio");

// const allEventsUrl =
//   "https://www.ticketweb.com/venue/funk-n-waffles-syracuse-ny/437585?pl=fnwsyracuse";
// // const oneEventUrl = "https://www.ticketweb.com/event/";

// const allEvents = () => {
//   return fetch(`${allEventsUrl}`)
//     .then((res) => res.text())
//     .then((body) => {
//       const $ = cheerio.load(body);
//       const events = [];

//       $(`.media-body`).each((index, ele) => {
//         const element = $(ele);
//         const title = element.find(".event-name");
//         const date = element.find(".event-date");
//         const link = element.find(".media-object").attr("href");
//         const event = {
//           title: title.text().replace(/\n\s\s+/g, ""),
//           date: date.text().replace(/\n\s\s+/g, ""),
//           link: link,
//         };
//         events.push(event);
//       });
//       events.map((event) => {
//         db.query(`INSERT INTO events
//             (title, date, description)
//             VALUES ('${event.title}', '${event.date}', '${event.description}')`);
//       });
//     });
// };

// // const getEvent = (eventID) => {
// //   return fetch(`${oneEventUrl}${eventID}`)
// //     .then((res) => res.text())
// //     .then((body) => {
// //       const $ = cheerio.load(body);
// //       const eventDetails = [];

// //       $(`.content`).each((index, ele) => {
// //         const element = $(ele);
// //         const title = element.find(".title");
// //         const date = element.find(".date");
// //         const description = element.find(".media-content p");
// //         const eventDetail = {
// //           title: title.text(),
// //           date: date.text().replace(/\n/g, ""),
// //             description: description.text().replace(/\n/g, ""),
// //         };
// //         eventDetails.push(eventDetail);
// //       });
// //       console.log(eventDetails);
// //       return eventDetails;
// //     });
// // };

// module.exports = {
//   allEvents,
//   //   getEvent,
// };
