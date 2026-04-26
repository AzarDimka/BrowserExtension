chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    navigator.clipboard.writeText(request.text)
        .then(() => console.log('Скопировано!'))
        .catch(err => console.error('Ошибка:', err));
});