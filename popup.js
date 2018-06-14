const APIKEY = '';

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  chrome.tabs.sendMessage(
    tabs[0].id,
    { message: 'page detail' },
    function queryTime(tabResponse) {
      fetch(`https://www.fakespot.com/product/${tabResponse.itemSlug}`)
        .then((fakeSpotResponse) => {
          fakeSpotResponse.text()
            .then((text) => {
              let temp = text;
              const words = [];
              while (temp.match(/<i>\w*<\/i>/)) {
                const match = temp.match(/<i>\w*<\/i>/);
                words.push(match[0]);
                temp = temp.slice(match.index + 7);
              }
              const sanitizedWords = words.join('+').replace(/<\/?i>/g, '');
              const displayWords = sanitizedWords.replace(/\+/g, ', ');
              const adjectives = document.createElement('p');
              const productDescription = tabResponse.itemSlug.split('-').slice(0, 3).join('+');
              adjectives.innerHTML = `Users mentioned that this product is: ${displayWords}`;
              document.getElementById('c3').appendChild(adjectives);

              fetch(`http://api.giphy.com/v1/gifs/search?q=${sanitizedWords || productDescription}&api_key=${APIKEY}`)
                .then((giphyResponse) => {
                  giphyResponse.json()
                    .then(body => {
                      const image = body.data[0].images.original.url;
                      const giphy = document.createElement('img');
                      giphy.src = image;
                      giphy.className = 'gif';
                      document.getElementById('c3').appendChild(giphy);
                    }).catch(console.log);
                }).catch(console.log);
            }).catch(console.log);
        }).catch(console.log);

      let chart = document.createElement('img');
      chart.src = tabResponse.location;
      document.getElementById('c3').appendChild(chart);
    },
  )
});

