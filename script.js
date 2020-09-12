const cheerio = require("cheerio");
const fetch = require("node-fetch");

const url = "https://timesofindia.indiatimes.com/topic/news-feed";

const givedata = async () => {
  const data = await fetch(url).then((res) => res.text());
  const $ = cheerio.load(data);
  var list = [];
  $(".tab_content ul li .content").each((e) => {
    const dat = $(e).children().text($.root());
    console.log(dat);
  });
};

givedata();
