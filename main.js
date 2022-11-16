"use strict";

const config = require("config");
const fs = require("fs");
const get_rss_feed = require("./lib/xml-parser");
const { createTimestampHeader, createSubtitle, createTitle, layoutRssData } = require("./lib/views");

const RSS_FILE_PATH = config.get("file_path");
const ALL_RSS_FEEDS = config.get("feeds");
const UPDATE_INTERVAL = config.get("interval");

async function main() {
  try {
    // Create the html file and write the current date as the header
    const html_file = await fs.createWriteStream(RSS_FILE_PATH);
    await html_file.write(createTimestampHeader());

    for(const [subcategory_title, subcategory_feeds] of Object.entries(ALL_RSS_FEEDS)) {
      // Add the subtitle for each rss category to the html file
      await html_file.write(createSubtitle(subcategory_title));

      for(const [source_name, source_url] of Object.entries(subcategory_feeds)) {
        await html_file.write(createTitle(source_name));
        const rss_news_data = await get_rss_feed(source_url);
        await html_file.write(layoutRssData(rss_news_data));

      }
    }
  }
  catch (err) {
    console.log("ERROR");
    console.log(err);
  }

}

// When the script first starts, main will run right away.
// After the initial html page creation, it will regenerate it based on the interval
main();
setInterval(main, UPDATE_INTERVAL);
