const fetch = require("node-fetch");
const cheerio = require("cheerio");
const cron = require("node-cron");
const chrono = require("chrono-node");
const dateFormat = require("dateformat");

const { db } = require("./models/db");
const allMusicUrl =
  "https://concerts50.com/upcoming-concerts-in-new-york/syracuse";

cron.schedule("* * */1 * *", async () => {
  const response = await fetch(`${allMusicUrl}`);
  const body = await response.text();
  const $ = cheerio.load(body);

  const music = [];

  $(`.event-item`).each((index, ele) => {
    const element = $(ele);
    const artist = element.find(".name p");
    const date = element.find(".date");
    const time = element.find(".event-time");
    const place = element.find(".name div");
    const location = place.text().replace(`'`, `''`);
    const title = artist.text().replace(`'`, `''`);
    const show = {
      tag: `music`,
      title: `${title}`,
      date: dateFormat(
        chrono.parseDate(date.text().replace(/\n/g, " ")),
        "isoDateTime"
      ),
      time: time.text(),
      location: `${location}`,
      link: `https://concerts50.com/upcoming-concerts-in-new-york/syracuse`,
    };
    music.push(show);
  });

  music.map((show) => {
    db.query(`INSERT INTO music
          (title, date, time, link, location, tag)
          VALUES ('${show.title}', '${show.date}', '${show.date}', '${show.link}', '${show.location}', '${show.tag}') ON CONFLICT (title) DO NOTHING`);
  });
});
