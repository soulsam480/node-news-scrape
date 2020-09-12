const express = require("express");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

const app = express();
app.use(express.static("public"));
const port = 3000;

app.get("/dat", async (req, res) => {
  function jsonEscape(str) {
    return str
      .replace(/\n/g, "\\\\n")
      .replace(/\r/g, "\\\\r")
      .replace(/\t/g, "\\\\t");
  }
  const url = "https://timesofindia.indiatimes.com/topic/news-feed";

  const data = await fetch(url).then((yol) => yol.text());
  const $ = cheerio.load(data);
  var list = [];

  $("#c_topic_list1_1 div.tab_content  ul li .content").each(function (
    i,
    elem
  ) {
    list[i] = {
      link: $(
        `#c_topic_list1_1 > div.tab_content > ul > li:nth-child(${
          i + 1
        }) > div > a`
      ).attr("href"),
      title: $(
        `#c_topic_list1_1 > div.tab_content > ul > li:nth-child(${
          i + 1
        }) > div > a > span.title`
      ).text(),
      date: $(
        `#c_topic_list1_1 > div.tab_content > ul > li:nth-child(${
          i + 1
        }) > div > a > span.meta`
      ).text(),
      data: $(
        `#c_topic_list1_1 > div.tab_content > ul > li:nth-child(${
          i + 1
        }) > div > a > p`
      ).text(),
    };
  });
  res.send(list);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
