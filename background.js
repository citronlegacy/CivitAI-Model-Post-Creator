// Background script to handle extension icon clicks

chrome.action.onClicked.addListener(() => {
  // Open the extension UI in a new window
  chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: 500,
    height: 700
  });
});
