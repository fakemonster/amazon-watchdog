chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('now it\'s green!!!!');
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.amazon.com' }
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log('got a message');
//     sendResponse({farewell: 'goodbye'});
//     chrome.runtime.sendMessage(request, (response) => {
//       console.log(response.farewell)
//     });
//   }
// )

