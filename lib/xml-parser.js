"use strict";

const fetch = require("node-fetch");
const FeedParser = require("feedparser");
const iconv = require("iconv-lite");

function get(feed) {
  // Set `user-agent` and `accept` headers when sending requests.
  // Some services will not respond as expected without them.
 const user_agent_config = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) " +
                           "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36";
 const accept_config = "text/html,application/xhtml+xml";
//  Create a promise that handle the feedparser stream
 const get_feed_promise = new Promise(async (resolve, reject) => {

  try {
    // Get the feed response object
    const feed_response = await fetch(feed, { "user-agent": user_agent_config, "accept": accept_config });
    const rss = [];
    // Setup feedparser stream
    const feedparser = new FeedParser();
    feedparser.on("error", reject);
    feedparser.on("end", () => {
      resolve(rss);
    });
    feedparser.on("readable", () => {
    let post;
    while (post = feedparser.read()) {
      rss.push({
        title: post.title,
        description: post.description,
        summary: post.summary,
        date: post.date,
        link: post.link,
        author: post.author,
      });
    }
    });

    // Handle our response and pipe it to feedparser
    if (feed_response.status != 200) throw new Error("Bad status code");
    let charset = getParams(feed_response.headers.get("content-type") || "").charset;
    let responseStream = feed_response.body;
    responseStream = maybeTranslate(responseStream, charset);
    // pipe responseStream to feedparser
    responseStream.pipe(feedparser);
  }
  catch (err) {
    reject(err);
  }
 });
//  Return the promise
 return get_feed_promise;
}

function maybeTranslate (res, charset) {
 let iconvStream;
 // Decode using iconv-lite if its not utf8 already.
 if (!iconvStream && charset && !/utf-*8/i.test(charset)) {
   try {
     iconvStream = iconv.decodeStream(charset);
     console.log("Converting from charset %s to utf-8", charset);
     iconvStream.on("error", err => {
      reject(err);
     });
     // If we're using iconvStream, stream will be the output of iconvStream
     // otherwise it will remain the output of request
     res = res.pipe(iconvStream);
   } catch(err) {
     res.emit("error", err);
   }
 }
 return res;
}

function getParams(str) {
 const params = str.split(";").reduce((params, param) => {
   const parts = param.split("=").map((part) => { return part.trim(); });
   if (parts.length === 2) {
     params[parts[0]] = parts[1];
   }
   return params;
 }, {});
 return params;
}

module.exports = get;
