function loadTexts() {
    chrome.storage.local.get(['savedTexts'], (result) => {
        const textarea = document.getElementById('text-area');
        let items = result.savedTexts || [];
            
        let markdown = items.map(item => {
            return `### ${item.date}\n**URL:** ${item.url}\n\n${item.text}`;
        }).join('\n---\n');
    
        if (result.savedTexts) {
            textarea.value = markdown;
        } else {
            textarea.value = '';
        };
    });
};

document.addEventListener('DOMContentLoaded', loadTexts);

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.savedTexts) {
        loadTexts();
    }
});