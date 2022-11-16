"use strict";

function createTimestampHeader() {
  return `<h1>Updated at: ${new Date()}</h1>`;
}

function createSubtitle(subtitle) {
  return `<h2>${subtitle}</h2>`;
}

function createTitle(title) {
  return `<h3><b>${title}</b></h3>`;
}

function layoutRssData(rss_news) {
  let html_block = "<table>";
  html_block += "<tr><th>Title</th><th>Date</th><th>Author</th></tr>";
  for(const [, news_block] of Object.entries(rss_news)) {
    html_block += "<tr>";
    html_block += `<td><a href='${news_block.link}'>${news_block.title}</a></td>`;
    html_block += `<td><strong>${news_block.date}</strong></td>`;
    html_block += `<td>${news_block.author}</td>`;
    html_block += "</tr>";
  }
  html_block += "</table>";
  return html_block;
}

module.exports.createTimestampHeader = createTimestampHeader;
module.exports.createSubtitle = createSubtitle;
module.exports.createTitle = createTitle;
module.exports.layoutRssData = layoutRssData;
