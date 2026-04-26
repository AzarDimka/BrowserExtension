// Создаём пункт меню при установке расширения
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "my-custom-button",      // Уникальный ID пункта
    title: "Моя кнопка",         // Текст, который увидит пользователь
    contexts: ["selection"]      // Когда показывать: при выделенном тексте
    // Другие варианты contexts: "page", "link", "image", "video", "all"
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "my-custom-button") {
    chrome.tabs.sendMessage(tab.id, {text: info.selectionText})
  }
});