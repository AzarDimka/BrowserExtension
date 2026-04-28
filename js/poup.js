document.addEventListener('DOMContentLoaded',function() {
    let button = document.getElementById('save-all');
    button.addEventListener('click', function() {
        chrome.storage.local.get(['savedTexts'], (result) => {
            let items = result.savedTexts || [];

            let markdown = items.map(item => {
                return `### ${item.date}\n**URL:** ${item.url}\n\n${item.text}`;
            }).join('\n---\n');

            let blob = new Blob([markdown], { type: 'text/markdown' });
            let url = URL.createObjectURL(blob);
    
            chrome.downloads.download({
                url: url,
                filename: 'saved-notes.md'
            }, () => {
                URL.revokeObjectURL(url);
            });
        });
    })
});

document.addEventListener('DOMContentLoaded',function() {
    let button = document.getElementById('open-settings');
    button.addEventListener('click', function() {
        chrome.runtime.openOptionsPage();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let button = document.getElementById('open-sidepanel');
    button.addEventListener('click', function() {
        chrome.windows.getCurrent((window) => {
            chrome.sidePanel.open({ windowId: window.id });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let button = document.getElementById('clean-all');
    button.addEventListener('click', function() {
        chrome.storage.local.set({ savedTexts: [] });
    });
});