var feedsLibrary = {
  prea: "http://fetchrss.com/rss/5ad0f27c8a93f8e6778b4567842180607.xml",
  nareit: "http://fetchrss.com/rss/5ad0f27c8a93f8e6778b4567140357561.xml",
  bre: "http://fetchrss.com/rss/5ad0f27c8a93f8e6778b4567918028761.xml",
  nrei: "http://www.nreionline.com/rss.xml",
  pionline: "http://www.pionline.com/rss/topics/real-estate",
  naiop: "https://www.naiop.org/en/RSS-Feeds/NAIOP-News.aspx",
  connectmedia: "https://www.connect.media/feed/",
  costar: "http://www.costar.com/News/RSS/RSS.aspx",
  ipe: "https://realassets.ipe.com/XmlServers/navsectionRSS.aspx?navsectioncode=2348",
  cpe: "https://www.cpexecutive.com/feed/",
  pere: "https://www.perenews.com/feed/",
  bisnow: "https://www.bisnow.com/rss-feed/home",
  globest: "http://m.feedblitz.com/globest/national",
  rentv: "http://fetchrss.com/rss/5ad0f27c8a93f8e6778b4567239708145.xml",
  rcm: "http://fetchrss.com/rss/5ad0f27c8a93f8e6778b4567365828158.xml",
}

$.each(feedsLibrary, function(feedName, feedUrl) {
  var baseUrl = "http://query.yahooapis.com/v1/public/yql?q="
  var queryString = encodeURI("SELECT * FROM feed WHERE url='" + feedUrl + "' LIMIT 5")
  var format = "&format=json"

  var rssFeedPath = baseUrl + queryString + format

  $.getJSON(rssFeedPath, function(response) {
    var feedItems = response.query.results.item

    $.each(feedItems, function( index ) {
      var item = feedItems[index]

      var ulElement = $('#' + feedName)
      ulElement.append('<li class="feed-item"><a class="feed-link" target="_blank" href="' + item.link + '">' + item.title +'</a></li>')
    })
  })
})

