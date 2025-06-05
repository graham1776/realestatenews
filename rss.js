const feedsLibrary = {
  // prea: "http://fetchrss.com/rss/5ad0f27c8a93f8e6778b4567842180607.xml",
  // nareit: "http://fetchrss.com/rss/5ad0f27c8a93f8e6778b4567140357561.xml",
  // bre: "http://fetchrss.com/rss/5ad0f27c8a93f8e6778b4567918028761.xml",
  // nrei: "http://www.nreionline.com/rss.xml",
  // pionline: "http://www.pionline.com/rss/topics/real-estate",
  // naiop: "https://www.naiop.org/en/RSS-Feeds/NAIOP-News.aspx",
  connectmedia: "https://www.connectcre.com/feed/",
  // costar: "http://www.costar.com/News/RSS/RSS.aspx",
  // ipe: "https://realassets.ipe.com/2720.rss",
  cs: "https://www.commercialsearch.com/news/feed/",
  // pere: "https://www.perenews.com/feed/",
  bisnow: "https://www.bisnow.com/rss-feed/home",
  // globest: "http://feeds.feedblitz.com/globest/national",
  // rentv: "http://fetchrss.com/rss/5ad0f27c8a93f8e6778b4567239708145.xml",
  // rcm: "http://fetchrss.com/rss/5ad0f27c8a93f8e6778b4567365828158.xml",
};

async function parseRSS(url, callback) {
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "application/xml");

    callback(xml);
  } catch (error) {
    console.error("Failed to fetch RSS feed:", error);
  }
}

Object.entries(feedsLibrary).forEach(([feedName, feedUrl]) => {
  parseRSS(feedUrl, (xml) => {
    const feedItems = xml.querySelectorAll("item");

    feedItems.forEach((item) => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;

      const ulElement = document.getElementById(feedName);
      if (ulElement) {
        ulElement.insertAdjacentHTML(
          "beforeend",
          `<li class="feed-item"><a class="feed-link" target="_blank" href="${link}">${title}</a></li>`
        );
      }
    });
  });
});