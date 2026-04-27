chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "remember-text",
    title: "Запомнить текст",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "remember-text") {

    chrome.storage.local.get(['savedTexts'], (result) => {
      let items = result.savedTexts || [];
      items.push({ text: info.selectionText, url: info.pageUrl, date: new Date().toISOString()});
      chrome.storage.local.set({ savedTexts: items});
      console.log('Stored name: ', items)
    })
  }
});