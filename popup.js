

document.getElementById('test').innerHTML = window.location.href;

// const changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', (data) => {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = (event) => {
//   const color = event.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       { code: `document.body.style.backgroundColor = "${color}";` },
//     );
//   });
// };

// chrome.runtime.onMessage.addListener (
//   function(request, sender, sendResponse) {
//     console.log('got a message')
//   }
// )

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    fetch(`http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=${APIKEY}`)
      .then((response) => {
        console.log(response);
        response.json().then(body => {
          console.log(body);
          let image = body.data[0].images.fixed_height_small.url;
          let giphy = document.createElement('img');
          giphy.src = image;
          document.getElementById('c3').appendChild(giphy);
        }).catch(console.log);
      })
      .catch(console.log);
    let chart = document.createElement('img');
    chart.src = request.location;
    document.getElementById('c3').appendChild(chart);

    sendResponse({farewell: 'goodbye'});
  }
)



// chrome.tabs.executeScript(
//   tabs[0].id,
//   {code: `document.getElementById('test').innerHTML(window.location.href)`}
// )