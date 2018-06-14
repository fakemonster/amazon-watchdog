
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    fetch(`https://www.fakespot.com/product/${request.itemSlug}`)
      .then((response) => {
        response.text()
          .then(text => {
            let temp = text;
            const words = [];
            while (temp.match(/<i>\w*<\/i>/)) {
              let match = temp.match(/<i>\w*<\/i>/);
              words.push(match[0]);
              temp = temp.slice(match.index + 7);
            }
            const sanitizedWords = words.join('+').replace(/<\/?i>/g, '');
            const displayWords = sanitizedWords.replace(/\+/g, ', ');
            const adjectives = document.createElement('p');
            adjectives.innerHTML = `Users mentioned that this product is: ${displayWords}`;
            document.getElementById('c3').appendChild(adjectives);

            fetch(`http://api.giphy.com/v1/gifs/search?q=${sanitizedWords}&api_key=${APIKEY}`)
              .then((response) => {
                response.json().then(body => {
                  let image = body.data[0].images.original.url;
                  let giphy = document.createElement('img');
                  giphy.src = image;
                  giphy.className = 'gif';
                  document.getElementById('c3').appendChild(giphy);
                }).catch(console.log);
              }).catch(console.log);
          }).catch(console.log);
      }).catch(console.log);

    let chart = document.createElement('img');
    chart.src = request.location;
    document.getElementById('c3').appendChild(chart);

  }
)



