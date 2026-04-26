// Создаём пункт меню при установке расширения
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "my-custom-button",      // Уникальный ID пункта
    title: "Моя кнопка",         // Текст, который увидит пользователь
    contexts: ["selection"]      // Когда показывать: при выделенном тексте
    // Другие варианты contexts: "page", "link", "image", "video", "all"
  });
});

const key = 'myKey';

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "my-custom-button") {
    chrome.tabs.sendMessage(tab.id, {text: info.selectionText})

    chrome.storage.local.get(['savedTexts'], (result) => {
      let items = result.savedTexts || [];
      items.push({ text: info.selectionText, url: info.pageUrl, date: new Date().toISOString()});
      chrome.storage.local.set({ savedTexts: items});
      console.log('Stored name: ', items)
    })
  }
});